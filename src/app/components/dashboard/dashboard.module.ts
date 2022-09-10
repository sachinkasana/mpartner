import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ConsumerEmiComponent } from './consumer-emi/consumer-emi.component';
import {FaqComponent} from './faq/faq.component'
import {ContactUsComponent} from './contact-us/contact-us.component';
import { CheckWarrantyStatusComponent } from './check-warranty-status/check-warranty-status.component';
import { ReportsComponent } from './reports/reports.component';
import { ServiceEscalationComponent } from './service-escalation/service-escalation.component';
import { BhmrComponent } from './bhmr/bhmr.component';
@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    ConsumerEmiComponent,
    FaqComponent,
    ContactUsComponent,
    CheckWarrantyStatusComponent,
    ReportsComponent,
    ServiceEscalationComponent,
    BhmrComponent
  ],
  exports: [
    DashboardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class DashboardModule {
}