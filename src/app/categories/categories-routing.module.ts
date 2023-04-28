import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'category', pathMatch:'full'
  // },
  {
    path:'category/:id', component:CategoryComponent
  },
  {
    path:'product-details/:id', component:ProductDetailsComponent
  },
  {
    path:'cart/:id', component:CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
