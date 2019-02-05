import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './_guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'view', component: ViewComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  }
];


