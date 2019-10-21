import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './guards/auth-guard.service';

const route: Routes = [
    { path: '', component: IndexPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
