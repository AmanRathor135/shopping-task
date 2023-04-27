import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {

  value:number = 1;
  productID:any;
  productName:any;
  productDetail:any[] =[];
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res:any) => {
      this.productID = res.params.id;
      this.getProductDetails();
      // console.log(this.productID);
      this.cd.markForCheck();
    })
  }

  getProductDetails(){
    this.auth.getSingleProduct(this.productID).subscribe({
      next: (res:any) => {
        this.productDetail.push(res) ;
        this.productName = res.title;
        // console.log(this.productDetail);
        // console.log(this.productName)
      },
      error: (err:any) => {
        console.log("Error",err);
      },
      complete: () => {
        this.cd.markForCheck();
      }
    })
  }

  addValue(){
    this.value++;
  }

  removeValue(){
    if(this.value < 2){
      this.value = 1; 
    }
    else{
      this.value--;
    }
  }
}
