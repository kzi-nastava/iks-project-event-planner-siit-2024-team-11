import {Component, inject} from '@angular/core';
import {EventsService} from '../services/events/events-service.service';
import {EventDetails} from '../model/events.model';
import {ActivatedRoute} from '@angular/router';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  private _snackBar = inject(MatSnackBar);
  event: EventDetails;

  constructor(private eventService: EventsService, private route: ActivatedRoute, private dialog: MatDialog) {
    let id: number = route.snapshot.params['eventId'];
    this.eventService.getEvent(id).subscribe({
      next: (event: EventDetails) => {
        this.event = event;

        setTimeout(() => {
          this.initMap();
        });

      },
      error: (event: EventDetails) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while loading the event",
            message: 'Error while loading the event.',
          },
        });
      }
    });
  }

  handleFavoriteItem() {
    this.eventService.toggleFavoriteEvent(this.event.id).subscribe({
      next: any => {
        this.event.isFavorite = !this.event.isFavorite;
        this._snackBar.open((this.event.isFavorite ? "FAVORITE: " : "REMOVE FAVORITE: ") + this.event.name, "OK!");
      },
      error: any => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Can't like if you aren't logged in",
            message: 'Please log in to make this your favorite event.',
          },
        });
      }
    })
  }

  initMap(): void {
    let map: L.Map | undefined = L.map('map').setView([this.event.location.latitude, this.event.location.longitude], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        '&copy; <a href="https://carto.com/">Carto</a>'
    }).addTo(map);
  }

  downloadEventDetails(): void {
    this.eventService.triggerEventDetailsPDFDownload(this.event.id).subscribe({
      next: (response: Blob) => {
        const blob: Blob = new Blob([response], { type: 'application/pdf' });
        const url: string = window.URL.createObjectURL(blob);
        const anchor: HTMLAnchorElement = document.createElement('a');
        anchor.href = url;
        anchor.download = this.event.name + '-event-details.pdf';
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.log(error);
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while downloading",
            message: 'Error while downloading event details. Please try again later.',
          },
        });
      }
    });
  }

  downloadGuestList(): void {
    this.eventService.triggerEventGuestListPDFDownload(this.event.id).subscribe({
      next: (response: Blob) => {
        const blob: Blob = new Blob([response], { type: 'application/pdf' });
        const url: string = window.URL.createObjectURL(blob);
        const anchor: HTMLAnchorElement = document.createElement('a');
        anchor.href = url;
        anchor.download = this.event.name + '-guest-list.pdf';
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while downloading",
            message: 'Error while downloading guest list. Please try again later.',
          },
        });
      }
    });
  }
}
