import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getReq(url:string){
    return this.http.get(url)
  }

  postReq(url:string,data?:any,params?:any){
    return this.http.post(url,data,params)
  }
}
