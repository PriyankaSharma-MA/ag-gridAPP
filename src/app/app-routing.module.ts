import { NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { routes } from './_nav'

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
