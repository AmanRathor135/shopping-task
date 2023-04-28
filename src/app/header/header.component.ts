import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  username: any;
  categories: any[] = [];
  totalProduct: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.auth.isLoggedIn.subscribe({
      next: (res: Boolean) => {
        if (res) {
          this.getUserName();
        }
      },
      error: (err: any) => {
        console.log("Error", err);
      },
      complete: () => {
        this.cd.markForCheck();
      },
    });

    this.auth.totalItems.subscribe((res: any) => {
      this.totalProduct = res;
      this.cd.markForCheck();
    });
  }

  getUserName() {
    if (localStorage.getItem("username")) {
      let name = localStorage.getItem("username");
      this.username = name;
    }
  }
  logoutUser() {
    this.auth.isLoggedIn.next(false);
    localStorage.clear();
    this.username = null;
    this.router.navigate(["login"]);
  }
}
