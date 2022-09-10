import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { OtpScreenComponent } from './components/auth/otp-screen/otp-screen.component';
import { BannerComponent } from './banner/banner.component';
import { LanguageComponent } from './components/auth/language/language.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SplashScreenComponent } from './components/auth/splash-screen/splash-screen.component';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { YouTubeVideosComponent } from './components/dashboard/you-tube-videos/you-tube-videos.component';
import { HomePageBannerComponent } from './components/dashboard/home-page-banner/home-page-banner.component';
import { WrsRejectReportComponent } from './components/wrs-reject-report/wrs-reject-report.component';
import { AuthGuardServiceService } from './route-gaurd/auth-guard-service.service';
import { LoaderInterceptor } from './core/services/loader/loader-interceptor-service';
import { SharedModule } from './components/shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeGridCardComponent } from "./components/dashboard/home-grid-card/home-grid-card.component";
import { ToastrModule } from 'ngx-toastr';
import { AddCreatorComponent } from './components/add-creator/add-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpScreenComponent,
    BannerComponent,
    LanguageComponent,
    HomeComponent,
    SplashScreenComponent,
    YouTubeVideosComponent,
    HomePageBannerComponent,
    WrsRejectReportComponent,
    PageNotFoundComponent,
    HomeGridCardComponent,
    AddCreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    //ToastrModule.forRoot(), // ToastrModule added
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    
    //PdfViewerModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    AuthGuardServiceService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
