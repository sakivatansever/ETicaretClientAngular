import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerToastrService } from '../ui/customer-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck() {
  /*  const spinner: NgxSpinnerService = inject(NgxSpinnerService);*/
   // const jwtHelper: JwtHelperService = inject(JwtHelperService);
    //const router: Router = inject(Router);
    //const toastrService: CustomerToastrService = inject(CustomerToastrService);
    const token: string = localStorage.getItem("accessToken");
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);

    } catch {

      expired = true
    }
    _isAuthenticated = token != null && !expired;
  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
