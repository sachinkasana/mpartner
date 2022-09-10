import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckStatusComponent } from './check-status/check-status.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { ScanSerialNumberComponent } from './scan-serial-number/scan-serial-number.component';
import { ServeyRequestComponent } from './servey-request/servey-request.component';


const routes: Routes = [
  { path: '', component: ServeyRequestComponent },
  { path: 'scan-serail-number', component: ScanSerialNumberComponent },
  { path: 'servey-request', component: RequestFormComponent },
  { path: 'check-status', component: CheckStatusComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServiceInstallationRoutingModule {
}