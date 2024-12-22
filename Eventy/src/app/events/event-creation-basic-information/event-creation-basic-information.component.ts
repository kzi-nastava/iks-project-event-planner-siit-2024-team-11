import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import * as L from 'leaflet';
import {EventTypeService} from '../event-type.service';
import {EventTypeCard} from '../model/events.model';
import {LatLng} from 'leaflet';

@Component({
  selector: 'app-event-creation-basic-information',
  templateUrl: './event-creation-basic-information.component.html',
  styleUrl: './event-creation-basic-information.component.css',
  providers: [provideNativeDateAdapter()] // is it okay to have a provider like this?
})
export class EventCreationBasicInformationComponent {
    @Input() basicInformationForm!: FormGroup;

    get dateRangeGroup() : FormGroup {
      return this.basicInformationForm.controls['dateRange'] as FormGroup;
    }

    eventTypes: EventTypeCard[] = [];

    minDate: Date = new Date();

    map: L.Map | undefined;
    @Input() selectedLatLng!: LatLng;
    currentMarker: L.Marker | undefined;
    @Input() selectedAddress!: string;
    readonly ftnCoordinates: [number, number] = [45.2445, 19.8484];
    @Output() getAdress = new EventEmitter<[string, LatLng]>();

    constructor(private eventTypeService: EventTypeService) {
      this.eventTypeService.getActiveEventTypes().subscribe({
        next: (response: EventTypeCard[]) => {
          this.eventTypes = response;
        }
      });
    }

    ngOnInit(): void {
      this.initMap();
    }

    initMap(): void {
      this.map = L.map('map').setView(this.ftnCoordinates, 15);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          '&copy; <a href="https://carto.com/">Carto</a>'
      }).addTo(this.map);

      // Handle click event for map picker
      this.map.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
    }

    onMapClick(e: L.LeafletMouseEvent): void {
      const latLng: L.LatLng = e.latlng;
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

    mapPinToAddress(): void {
      const url: string = `https://nominatim.openstreetmap.org/reverse?lat=${this.selectedLatLng.lat}&lon=${this.selectedLatLng.lng}&format=json`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.selectedAddress = data.display_name;
          this.getAdress.emit([this.selectedAddress, this.selectedLatLng]);
        })
        .catch(error => console.error('Error fetching address:', error));
    }
}
