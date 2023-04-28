import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  value: any = 1;
  productID: any;
  productName: any;
  productDetail: any;
  selectedItem: any;
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      this.productID = res.params.id;
      this.getProductDetails();
      this.cd.markForCheck();
    });
  }

  getProductDetails() {
    this.auth.getSingleProduct(this.productID).subscribe({
      next: (res: any) => {
        this.productDetail = res;
        this.productName = res.title;
      },
      error: (err: any) => {
        console.log("Error", err);
      },
      complete: () => {
        this.cd.markForCheck();
      },
    });
  }

  addValue() {
    this.value++;
  }

  removeValue() {
    if (this.value < 2) {
      this.value = 1;
    } else {
      this.value--;
    }
  }

  goToCart(item: any) {
    this.selectedItem = item;
    this.selectedItem["quantity"] = this.value;
    let cartItems: any = [];
    this.auth.addNewCart(this.selectedItem).subscribe({
      next: (res: any) => {
        const getCartItem = JSON.parse(
          localStorage.getItem("addCartItem") || "{}"
        );
        if (getCartItem && getCartItem.length) {
          cartItems = getCartItem;
          cartItems.push(this.selectedItem);
        } else {
          cartItems.push(this.selectedItem);
        }

        localStorage.setItem("addCartItem", JSON.stringify(cartItems));
        console.log(res);
        this.router.navigate(["/categories/cart", item.id]);
      },
    });
  }
}
