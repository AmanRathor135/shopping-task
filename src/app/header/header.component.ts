import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username:any;
  categories:any[] = [];
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getUserName();

    this.auth.isLoggedIn.subscribe({
      next: (res:Boolean) => {
        if(res){
          this.getUserName();
        }
      }
    })
  }
  
  getUserName(){
    if(localStorage.getItem('username')){
      let name = localStorage.getItem('username');
      this.username = name;      
    }
  }
  logoutUser(){
    this.auth.isLoggedIn.next(false);
    localStorage.clear();
    this.username = null;
    this.router.navigate(['login'])
  }
}
