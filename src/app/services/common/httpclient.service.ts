import { Inject, Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from"@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private httpclient:HttpClient,@Inject("baseUrl") private baseUrl:string ) {




  }

  private  url(RequestParameter:Partial<RequestParametres>):string{
    return `${RequestParameter.baseUrl?RequestParameter.baseUrl:this.baseUrl}/${RequestParameter.controller}${RequestParameter.action?
      `/${RequestParameter.action}`:"" }`

  }

  get<T>(RequestParameter:Partial<RequestParametres>,id?:string):Observable<T>{
  let url :string ="";
  if(RequestParameter.fullEndPoint)
  {
    url=RequestParameter.fullEndPoint;
  }
  else {
    url = `${this.url(RequestParameter)}${id ? `/${id}` : ""}${RequestParameter.queryString ? `?${ RequestParameter.queryString}`:""}`;
  }

  return this.httpclient.get<T>(url,{headers:RequestParameter.headers})
  }
  post<T>(RequestParameter:Partial<RequestParametres>,body:Partial<T>):Observable<T>{
    let url:string ="";
 if(RequestParameter.fullEndPoint)
 {
  url=RequestParameter.fullEndPoint;
 }

 else
 {
   url = `${this.url(RequestParameter)}${RequestParameter.queryString ? `?${RequestParameter.queryString}` : ""}`
 }


   return this.httpclient.post<T>(url,body,{headers:RequestParameter.headers});
  }
  put<T>(RequestParameter:Partial<RequestParametres>,body:Partial<T>):Observable<T>{
    let url :string="";
    if(RequestParameter.fullEndPoint)
    {
     url=RequestParameter.fullEndPoint;
    }

    else
    {
      url = `${this.url(RequestParameter)}${RequestParameter.queryString ? `?${RequestParameter.queryString}` : ""}`
    }
    return this.httpclient.put<T>(url,body, { headers :RequestParameter.headers} )


  }
  delete<T>(RequestParameter:Partial<RequestParametres>,id:string):Observable<T>{
    let url :string="";
    if(RequestParameter.fullEndPoint)
    {
     url=RequestParameter.fullEndPoint;
    }

    else
    {
      url = `${this.url(RequestParameter)}/${id}${RequestParameter.queryString ? `?${RequestParameter.queryString}` : ""}`
    }
  return  this.httpclient.delete<T>(url,{headers:RequestParameter.headers})

  }
}


export class RequestParametres {
  controller?:string;
  action?: string;
  queryString?: string;

  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string;

}
