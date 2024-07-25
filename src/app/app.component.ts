 import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from './services/ui/customer-toastr.service';
import { MessageType } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService, private toastrService: CustomerToastrService, private router: Router) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken")
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum Kapatılmıştır!", "Oturum Kapatıldı.", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  }


}


$.get("https://localhost:7106/api/products",data=>{
  console.log(data)
})









//Test
  // constructor(private toastrService:CustomerToastrService){
  //   toastrService.message("Merhaba","BilgeAdam",{
  //     messageType:ToastrMessageType.Info,
  //     position:ToastrPosition.BottomCenter
  //   });
  //   toastrService.message("Merhaba","BilgeAdam",{
  //     messageType:ToastrMessageType.Error,
  //     position:ToastrPosition.BottomFullWidth
  //   });
  //   toastrService.message("Merhaba","BilgeAdam",{
  //     messageType:ToastrMessageType.Warning,
  //     position:ToastrPosition.BottomLeft
  //   });
  //   toastrService.message("Merhaba","BilgeAdam",{
  //     messageType:ToastrMessageType.Info,
  //     position:ToastrPosition.BottomLeft
  //   });

 // }
