import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountServices } from '../../_services/account-services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {
  claims: any = null;
  
  constructor(
    private accountServices: AccountServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.claims = this.accountServices.GetClaims();
  }

  Logout() {
    this.accountServices.Logout();
    this.router.navigate([`/login`]);
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: `Please come back to us`,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'my-swal',
      },
    });
  }
}
