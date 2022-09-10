import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServeyRequestComponent } from './servey-request/servey-request.component';
import { CheckStatusComponent } from './check-status/check-status.component';
import { ScanSerialNumberComponent } from './scan-serial-number/scan-serial-number.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { ServiceInstallationRoutingModule } from './service-installation-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ServeyRequestComponent,
    CheckStatusComponent,
    ScanSerialNumberComponent,
    RequestFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServiceInstallationRoutingModule
  ]
})
export class ServiceInstallationModule { }
