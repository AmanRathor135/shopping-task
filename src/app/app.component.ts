import { Component } from '@angular/core';
import { Router,Event as NavigationEvent,
  NavigationStart,
  NavigationEnd, } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading:boolean = false;
  title = 'shopping-cart';

  constructor(private router: Router){

    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });
  }
}
