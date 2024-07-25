import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../../ui/customer-toastr.service';
import { HttpclientService } from '../httpclient.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpclientService: HttpclientService, private toastrSerice: CustomerToastrService) { }

  async refreshTokenLogin(refreshToken: string, callBackFuntion?: () => void): Promise<any>{
    const observable: Observable<any | TokenResponse> = this.httpclientService.post({
      action: "RefreshTokenLogin",
      controller: "auth"
    }, { refreshToken: refreshToken });

    const tokenresponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenresponse) {
      localStorage.setItem("accessToken", tokenresponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenresponse.token.refreshToken);

    }
       
   
    callBackFuntion();

  }

  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpclientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { usernameOrEmail, password })

    const tokenReponse: TokenResponse = await firstValueFrom(observable) as TokenResponse
    if (tokenReponse) {
      localStorage.setItem("accessToken", tokenReponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenReponse.token.refreshToken);

      this.toastrSerice.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

  async googleLogin(user: SocialUser, callbackfunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpclientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user)
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrSerice.message("Google üzerinden giriş sağlandı", "Giriş başarılıdır", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }

    callbackfunction();
  }
}
