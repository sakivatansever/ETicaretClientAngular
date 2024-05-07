import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { Create_Product } from '../../../../contracts/create_product';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertift: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {

  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploaadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri sürekleyin veya seçin",
    isAdminPage: true,
    accept:".png,.jpg,.jepg"
  };

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom)
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value)
    create_product.stock = parseInt(stock.value)


    

    ////bu alan client tarafında validation doğrulması için yazılmıştır. 
    if (!name.value) {
      this.alertift.message("Lütfen ürün adını giriniz ", {
        dismissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      })
      return;
    }

    if (parseInt(stock.value)<0) {
      this.alertift.message("Lütfen stok bilgisini doğru  giriniz ", {
        dismissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      })
      return;
    }
   ////bu alan client tarafında validation doğrulması için yazılmıştır. 


    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertift.message("Ürün başarı ile eklenmiştir", {
        dismissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_product);

    },
      errorMessage => {
        this.alertift.message(errorMessage, {
          dismissOther: true,
          messageType: MessageType.Error,
          position: Position.TopRight

        });


      });

  }
}
