import { Component, OnInit } from '@angular/core';
import { User, UserServices } from '../../_services/user-services';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-component.html',
  styleUrl: './customer-component.css',
})
export class CustomerComponent implements OnInit {
  users: User[] = [];
  constructor(public userServices: UserServices) {}

  loadUsers() {
    this.userServices.GetAllUser().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });
  }
  ngOnInit(): void {
    this.loadUsers();
  }
  DeletUser(id:string) {
     Swal.fire({
          title: 'Do you want to delete this user?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
               this.userServices.DeletUser(id).subscribe({
                  next: () => {
                    console.log("User Is Deleted");
                    this.loadUsers();
                  },
                   error: (err) => console.error(err)
               })
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
  }
}
