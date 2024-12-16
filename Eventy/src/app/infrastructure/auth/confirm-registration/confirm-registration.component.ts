import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrl: './confirm-registration.component.css'
})
export class ConfirmRegistrationComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id: number = Number(params.get('requestId'));
      this.authService.confirmRegistration(isNaN(id) ? undefined : id);
      this.router.navigate(['home']);
    });
  }
}
