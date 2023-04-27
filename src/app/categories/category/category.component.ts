import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  category:any;
  product:any[] =[];
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res:any) => {
      this.category = res.params.id;
      this.getSpecialCategory();
      this.cd.markForCheck();
    })
  }

  getSpecialCategory(){
    this.auth.getSpecificCategory(this.category).subscribe({
      next: (res:any) => {
        this.product = res;
        console.log(res);
      },
      error: (err:any) => {
        console.log("Error",err);
      },
      complete: () => {
        // console.log("Completed!");
        this.cd.markForCheck();
      }
    })
  }
}
