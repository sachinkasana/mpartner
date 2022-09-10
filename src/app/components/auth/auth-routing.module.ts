import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './language/language.component';
import { LoginComponent } from './login/login.component';
import { OtpScreenComponent } from './otp-screen/otp-screen.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';


const routes: Routes = [
  { path: 'language', component: LanguageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'splash-screen', component: SplashScreenComponent },
  { path: 'otp', component: OtpScreenComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CatalogRoutingModule {
}