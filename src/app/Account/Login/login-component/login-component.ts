import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountServices } from '../../../_services/account-services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  useLoginForm: FormGroup;
  loginError: string = '';

  constructor(public accountServices: AccountServices, private router: Router) {
    this.useLoginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  AddUser() {
    if (this.useLoginForm.invalid) return;

    this.accountServices.Login(this.useLoginForm.value).subscribe({
      next: (res: any) => {
        this.accountServices.SaveToken(res.token);
        this.router.navigate(['/home']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Welcom Back To Our Store`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'my-swal',
          },
        });
      },
      error: (err) => {
        // لو الـ API رجع خطأ، نعرض رسالة تحت الفورم
        this.loginError = 'Username or password is wrong!';
      },
    });
  }
}
