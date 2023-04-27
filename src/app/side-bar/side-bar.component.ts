import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  categories:any[] =[];
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getDetails(item:any){
    this.router.navigate([`/categories/category/${item}`])
  }

  getAllCategories(){
    this.auth.getCategories().subscribe({
      next: (res:any) => {
        this.categories = res;
        // console.log(res);  
      },
      error: (err:any) => {
        console.log("Error", err);
      },
      complete: () => {
        console.log("Completed!");
      }
    })
  }
}
