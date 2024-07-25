import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/customer-toastr.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastrService: CustomerToastrService = inject(CustomerToastrService);
  const authService: AuthService = inject(AuthService)
  
  spinner.show(SpinnerType.BallAtom)

  //const token: string = localStorage.getItem("accessToken");
  //let expired: boolean;
  //try {
  //  expired = jwtHelper.isTokenExpired(token);
  //} catch {

  //  expired = true
  //}
  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    toastrService.message("oturum açılması gerekli ", "Yetkisiz erişim", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  }

  spinner.hide(SpinnerType.BallAtom);


  return true;
};
