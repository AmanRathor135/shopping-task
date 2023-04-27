import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service:HttpService) { }

  isLoggedIn = new BehaviorSubject<boolean>(false);

  loggedIn(data:any){
    return this.service.postReq('https://fakestoreapi.com/auth/login',data)
  }

  getCategories(){
    return this.service.getReq('https://fakestoreapi.com/products/categories')
  }

  getProducts(){
    return this.service.getReq('https://fakestoreapi.com/products')
  }

  getSpecificCategory(params?:any){
    return this.service.getReq(`https://fakestoreapi.com/products/category/${params}`)
  }

  getSingleProduct(params?:any){
    return this.service.getReq(`https://fakestoreapi.com/products/${params}`)
  }

  cart(params?:any){
    return this.service.getReq(`https://fakestoreapi.com/carts/${params}`)
  }
}
