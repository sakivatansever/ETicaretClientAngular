import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from './services/ui/customer-toastr.service';
import { MessageType } from './services/admin/alertify.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';


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
