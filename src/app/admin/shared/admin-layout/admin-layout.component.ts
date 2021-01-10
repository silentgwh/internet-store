import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public authentication : AuthenticationService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  logout($event) {
    $event.preventDefault();
    this.authentication.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
