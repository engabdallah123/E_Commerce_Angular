import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountServices } from '../_services/account-services';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {


  let authServices = inject(AccountServices);
  let router = inject(Router);


  if(authServices.IsLogged()) {
    return true
  }else {
    router.navigateByUrl(`/login`);
    Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `You Must Login First`,
                showConfirmButton: false,
                timer: 1500,
                     customClass: {
                       popup: 'my-swal',
                     },
                   });
      return false
  }

};
