import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  categories:any[] = [];
  products:any[] = [];
  limit:number = 6;
  constructor(private auth:AuthService, private router:Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.auth.getProducts().subscribe({
      next: (res:any) => {
        this.products = res;
        // console.log(this.products);  
      },
      error: (err:any) => {
        console.log("Error", err);
      },
      complete: () => {
        // console.log("Completed!");
        this.cd.markForCheck();
      }
    })
  }

  loadMore(){
    this.limit = this.limit + 6;
    this.getAllProducts();
  }
}
