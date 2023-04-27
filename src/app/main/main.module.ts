import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
