import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypeCard, UpdateEvent} from '../model/events.model';
import * as L from 'leaflet';
import {latLng, LatLng} from 'leaflet';
import {EventTypeService} from '../event-type.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {EventsService} from '../services/events/events-service.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css',
  providers: [provideNativeDateAdapter()]
})
export class EditEventComponent {
  basicInformationForm: FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    maxNumberParticipants: new FormControl(0, [Validators.required, Validators.pattern("^[1-9]\\d*$")]),
    eventType: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required])
  });

  eventTypes: EventTypeCard[] = [];

  minDate: Date = new Date();

  map: L.Map | undefined;
  selectedLatLng: LatLng;
  currentMarker: L.Marker | undefined;
  selectedAddress: string;

  constructor(private eventTypeService: EventTypeService, private eventService: EventsService,
              private route: ActivatedRoute, private dialog: MatDialog) {
    this.eventTypeService.getActiveEventTypes().subscribe({
      next: (response: EventTypeCard[]) => {
        this.eventTypes = response;

        let id: number = route.snapshot.params['id'];
        this.eventService.getEventForUpdate(id).subscribe({
          next: (response: UpdateEvent) => {
            this.basicInformationForm = new FormGroup({
              name : new FormControl(response.name, Validators.required),
              description: new FormControl(response.description, Validators.required),
              maxNumberParticipants: new FormControl(response.maxNumberParticipants, [Validators.required, Validators.pattern("^[1-9]\\d*$")]),
              eventType: new FormControl(this.eventTypes.find(type => response.eventTypeId === type.id).id, Validators.required),
              date: new FormControl(response.date, Validators.required),
            });

            this.initMap([response.location.latitude, response.location.longitude]);
            this.showNewMapClick(new LatLng(response.location.latitude, response.location.longitude));
          },
          error: () => {
            this.dialog.open(ErrorDialogComponent, {
              width: '400px',
              disableClose: true, // prevents closing by clicking outside
              backdropClass: 'blurred_backdrop_dialog',
              data: {
                title: 'Error',
                message: 'Error while fetching the event! Please try again later.',
              },
            });
          }
        })
      }
    });
  }

  initMap(latLng: [number, number]): void {
    this.map = L.map('map').setView(latLng, 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        '&copy; <a href="https://carto.com/">Carto</a>'
    }).addTo(this.map);

    // Handle click event for map picker
    this.map.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
  }

  onMapClick(e: L.LeafletMouseEvent): void {
    const latLng: L.LatLng = e.latlng;

    this.showNewMapClick(latLng)
  }

  mapPinToAddress(): void {
    const url: string = `https://nominatim.openstreetmap.org/reverse?lat=${this.selectedLatLng.lat}&lon=${this.selectedLatLng.lng}&format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.selectedAddress = data.display_name;
      })
      .catch(error => console.error('Error fetching address:', error));
  }

  showNewMapClick(latLng: L.LatLng): void {
    this.selectedLatLng = latLng;

    if (this.currentMarker) {
      this.map?.removeLayer(this.currentMarker);
    }

    const icon : L.Icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    this.currentMarker = L.marker(latLng, { icon }).addTo(this.map);

    this.mapPinToAddress();
  }
}
