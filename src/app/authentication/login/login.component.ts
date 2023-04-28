import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginUserData: any = { username: "", password: "" };
  // allowedUsername = 'mor_2314';
  // allowedPassword = '83r5^_';
  submitted: boolean = false;
  helper: any = new JwtHelperService();
  token: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    this.submitted = true;

    this.auth.loggedIn(this.loginUserData).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token);
        this.token = this.helper.decodeToken(res.token);
        localStorage.setItem("username", this.token.user);
        this.auth.isLoggedIn.next(true);
      },
      error: (err: any) => {
        // console.log('Error', err);
        alert("Invalid Credentials");
      },
      complete: () => {
        if (this.token.user) {
          this.router.navigate(["/dashboard"]);
          console.log("Completed!");
        }
      },
    });
  }
}
