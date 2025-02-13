import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Activity, EventTypeCard, UpdateEvent} from '../model/events.model';
import * as L from 'leaflet';
import {LatLng} from 'leaflet';
import {EventTypeService} from '../event-type.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {EventsService} from '../services/events/events-service.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {
  InvalidInputDataDialogComponent
} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';

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
            this.agenda = response.agenda;
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

  activityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    timeRange: new FormControl([], [Validators.required, this.validateTimeRange()])
  });

  displayedColumns: string[] = ['name', 'description', 'location', 'startTime', 'endTime'];
  agenda: Activity[] = [];

  minStartTime: Date;

  addActivity() : void {
    this.activityForm.controls['name'].setValue(this.activityForm.controls['name'].value)
    this.activityForm.controls['description'].setValue(this.activityForm.controls['description'].value)
    this.activityForm.controls['location'].setValue(this.activityForm.controls['location'].value)
    this.activityForm.controls['timeRange'].setValue(this.activityForm.controls['timeRange'].value)

    if(this.activityForm.valid) {
      let newActivity: Activity = {
        name: this.activityForm.controls['name'].value,
        description: this.activityForm.controls['description'].value,
        location: this.activityForm.controls['location'].value,
        startTime: this.activityForm.controls['timeRange'].value[0],
        endTime: this.activityForm.controls['timeRange'].value[1]
      }
      this.agenda = [...this.agenda, newActivity];
      this.minStartTime = this.activityForm.value.timeRange[1];
      this.activityForm.reset(
        {
          "name": "",
          "description": "",
          "location": "",
          "timeRange": [this.minStartTime, this.minStartTime]
        }
      );
      Object.keys(this.activityForm.controls).forEach(key => {
        this.activityForm.controls[key].setErrors(null) ;
      });
    } else {
      this.dialog.open(InvalidInputDataDialogComponent, {
        data : {
          title: "Invalid input",
          message: "Invalid input data"
        }
      });
    }
  }

  formatDate(date : Date) : string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',   // full day name (e.g., Monday)
      year: 'numeric',   // year (e.g., 2024)
      month: 'long',     // full month name (e.g., October)
      day: 'numeric',    // day of the month (e.g., 13)
      hour: '2-digit',   // hour (e.g., 03 PM)
      minute: '2-digit'  // minute (e.g., 45)
    });
  }

  private validateTimeRange(): ValidatorFn {
    return (): ValidationErrors | null => {
      if(this.activityForm) {
        return this.activityForm.controls['timeRange'].value[0] && this.activityForm.controls['timeRange'].value[1] ? null : { bothTimesEntered: true };
      }

      return null;
    };
  }
}
