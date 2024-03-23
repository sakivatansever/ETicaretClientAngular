import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from '../../../contracts/create_product';
import { List_Product } from '../../../contracts/list_products';

import { HttpclientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclientService: HttpclientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpclientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();

    }, (errorResponse: HttpErrorResponse) => {
      const _erorr: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _erorr.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });

      });
      errorCallBack(message)
    });
  }


  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{totalCount: number, products:List_Product[] }>{
    const promiseData: Promise<{totalCount:number,products:List_Product[]}> = this.httpclientService.get<{totalCount: number,products:List_Product[]}>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
      

    }).toPromise();
    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => (errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any>=  this.httpclientService.delete<any>({
      controller: "products"
    }, id)
    await firstValueFrom(deleteObservable);
  }

}
