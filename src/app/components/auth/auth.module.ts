import { NgModule } from '@angular/core';

import { CatalogRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LanguageComponent } from './language/language.component';
import {OtpScreenComponent} from './otp-screen/otp-screen.component'
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@NgModule({
  imports: [
    CatalogRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    LanguageComponent,
    OtpScreenComponent,
    SplashScreenComponent
  ],
  exports: [
    LoginComponent,
    LanguageComponent,
    OtpScreenComponent,
    SplashScreenComponent
  ]
})
export class CatalogModule {
}