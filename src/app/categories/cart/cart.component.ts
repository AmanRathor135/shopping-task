import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  productID: any;
  product: any[] = [];
  totalSum: any = 0;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getCartList();
    this.total();
  }

  getCartList() {
    const getSelectedItem: any = localStorage.getItem("addCartItem");
    this.product = JSON.parse(getSelectedItem);
    this.auth.totalItems.next(this.product.length);
  }

  remove(index: any) {
    if (this.product.length) {
      this.product.splice(index, 1);
      this.auth.totalItems.next(this.product.length);
      localStorage.setItem("addCartItem", JSON.stringify(this.product));
    }
  }

  total() {
    for (let i = 0; i < this.product.length; i++) {
      this.totalSum += this.product[i].price * this.product[i].quantity;
    }
    console.log("total", this.totalSum);
  }
}
