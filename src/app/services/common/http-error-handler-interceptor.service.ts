import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../ui/customer-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomerToastrService, private userAuthServicce: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError( error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlemi yapmaya yetkiniz yok", "Yetkisiz işlem", {
            messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomFullWidth
          });
          
          this.userAuthServicce.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

          })

          break;

        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilmiyor", "Sunucu hatası ", {
            messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı ", "Geçersiz istek ", {
            messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.NotFound:
          this.toastrService.message("bulunamadı ", "Not found", {
            messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomFullWidth
          });
          break;

        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi", "Hata", {
            messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomFullWidth
          });
          break;
      };
   
      return of(error);
    }))
    }
}
