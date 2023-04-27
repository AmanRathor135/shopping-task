import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  @ViewChild(ProductDetailsComponent, {read:ElementRef}) price:any;
  productID:any;
  productPrice:any;
  constructor(private route:ActivatedRoute, private auth:AuthService, private router:Router) {

    this.route.paramMap.subscribe((res:any) => {
      this.productID = res.params.id;
      console.log("res==>",this.productID); 
    })
   }

  ngOnInit(): void {
    this.addToCart();
  }
  ngAfterViewInit(): void {
    this.productPrice = this.price.value;
    console.log("price",this.productPrice);
    
  }


  addToCart(){
    this.auth.getSingleProduct(this.productID).subscribe({
      next: (res:any) => {
        console.log("add to cart",res);
        
      }
    })
  }

}
