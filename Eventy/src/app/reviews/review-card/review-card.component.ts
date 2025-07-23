import { Component, Input } from '@angular/core';
import { Review, Status } from '../model/review.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {

  @Input() review: Review = {
    id: -1,
    comment: "",
    grade: 0,
    senderEmail: "",
    recipientEmail: "",
    title: "",
    status: Status.DENIED,
    isDeleted: false,
    senderName: "",
    senderAvatar: ""
  };
  
  constructor() {
    
  }

}
