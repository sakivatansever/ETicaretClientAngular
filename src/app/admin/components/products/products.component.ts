import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product'  // product idi değişti .sonradan 
import { HttpclientService } from 'src/app/services/common/httpclient.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor( spinner:NgxSpinnerService ,private httpClientService:HttpclientService) {
    super(spinner)
  }


  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom)





    // this.httpClientService.get({
    //   controller:"products"
    // }).subscribe(data=>console.log(data))


   // Backend tarafında gönderilen nesnenin karşılığını burada göstererek json formatındaki datayı çok daha rahat çözümledik .
    this.httpClientService.get<Create_Product[]>({
      controller:"products"
    }).subscribe(data=>{
      console.log( data[0].name )
    })

    ///



    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"Test",
    //   stock:200,
    //   price:20
    // }).subscribe();

   //this.httpClientService.put({
   // controller:"products",
   //},{
   // id:"95f5d150-a7a3-4728-aa85-e3159fce8115",
   // name:"GuncellTest",
   // price:44
   //}).subscribe()


   //this.httpClientService.delete({
   // controller:"products"},
   // "211591b4-6cce-4a11-b645-a6d7dd22015e").subscribe()



   // this.httpClientService.get({
   //   baseUrl:"https://jsonplaceholder.typicode.com",
   //   controller:"posts"
   // }).subscribe(data=>console.log(data))




   // this.httpClientService.get({
   //   fullEndPoint:"https://jsonplaceholder.typicode.com",

   // }).subscribe(data=>console.log(data))


  }


  @ViewChild(ListComponent) listComponents: ListComponent
  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();

  }
}
