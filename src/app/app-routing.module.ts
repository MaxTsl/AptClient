import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './home/reg/reg.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path:'', redirectTo: '/user/login', pathMatch: 'full'}
    ,{
        path:'user',component: UserComponent,
        children:[
            {path: 'login', component: LoginComponent}
        ]
    }
    ,{
        path:'home', component:HomeComponent, canActivate:[AuthGuard],
        children:[
            {path: 'registration', component: RegistrationComponent}
        ]
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 