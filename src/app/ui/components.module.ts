import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModule } from './components/login/login.module';
import { ProductsModule } from './components/products/products.module';
import { HomeModule } from './components/home/home.module';
import { BasketsModule } from './components/baskets/baskets.module';
import { RegisterModule } from './components/register/register.module';



@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
   // LoginModule,
  ]
})
export class ComponentsModule { }
