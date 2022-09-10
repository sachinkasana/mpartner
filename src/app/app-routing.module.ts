import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { OtpScreenComponent } from './components/auth/otp-screen/otp-screen.component';
import { LanguageComponent } from './components/auth/language/language.component';
import { SplashScreenComponent } from './components/auth/splash-screen/splash-screen.component';
import { ScratchCardComponent } from './components/shared/scratch-card/scratch-card.component';
import { QrCodeScannerComponent } from './components/shared/qr-code-scanner/qr-code-scanner.component';
import { BarCodeScannerComponent } from './components/shared/bar-code-scanner/bar-code-scanner.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', pathMatch:"full", component: SplashScreenComponent},
  { path: 'language', component: LanguageComponent },
  { path: 'card', component: ScratchCardComponent },
  { path: 'scan', component: QrCodeScannerComponent },
  { path: 'bar-scan', component: BarCodeScannerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'otp', component: OtpScreenComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'price-list',
        loadChildren: () =>
          import('./components/price-list/price-list.module').then((m) => m.PriceListModule)
      },
      {
        path: 'e-warranty',
        loadChildren: () =>
          import('./components/e-warrenty/e-warranty.module').then((m) => m.EWarrantyModule)
      },
      {
        path: 'catalog',
        loadChildren: () =>
          import('./components/catalog/catalog.module').then((m) => m.CatalogModule)
      },
      {
        path: 'schemes',
        loadChildren: () =>
          import('./components/schemes/schemes.module').then((m) => m.SchemesModule)
      },
      {
        path: 'consumer-emi',
        loadChildren: () =>
          import('./components/dashboard/consumer-emi/consumer-emi.module').then((m) => m.ConsumerEmiModule)
      },
      {
        path: 'user-info',
        loadChildren: () =>
          import('./components/user-info/user-info.module').then((m) => m.UserInfoModule)
      },
      {
        path: 'service-installation',
        loadChildren: () =>
          import('./components/service-installation/service-installation.module').then((m) => m.ServiceInstallationModule)
      },
      {
        path: 'solar-calculator',
        loadChildren: () =>
          import('./components/solar-calculator/solar-calculator.module').then((m) => m.SolarCalculatorModule)
      },
      {
        path: 'dealer-management',
        loadChildren: () =>
          import('./components/dealer-mangement/dealer-management.module').then((m) => m.DealerManagementModule)
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
