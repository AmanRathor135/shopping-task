import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationModule)
  },
  {
    path:'',
    loadChildren: () => import('./main/main.module').then( m => m.MainModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
