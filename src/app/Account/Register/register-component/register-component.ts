import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,AbstractControl,ValidationErrors, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountServices } from '../../../_services/account-services';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  useRegisterForm: FormGroup;

  constructor(public accountServices:AccountServices,private router:Router) {
    this.useRegisterForm = new FormGroup(
      {
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
        address: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
        state: new FormControl(''),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom Validator
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const rePassword = formGroup.get('rePassword')?.value;

    return password === rePassword ? null : { passwordMismatch: true };
  }

  AddUser() {
     this.accountServices.Register(this.useRegisterForm.value).subscribe({
       next: (res: any) => {
         this.accountServices.SaveToken(res.token)
         this.router.navigate([`/home`])
          Swal.fire({
                 position: 'top-end',
                 icon: 'success',
                 title: `Welcom To Our Store`,
                 showConfirmButton: false,
                 timer: 1500,
                 customClass: {
                   popup: 'my-swal',
                 },
               });
       },
       error: (err) => {
         console.error('Register failed', err);
       },
     });
  }
}



