import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YouTubeVideosComponent } from './you-tube-videos/you-tube-videos.component';
import {FaqComponent} from './faq/faq.component'
import {ContactUsComponent} from './contact-us/contact-us.component';
import {DealerOptionsComponent  } from "../e-warrenty/dealer-options/dealer-options.component";
import { WrsRejectReportComponent } from '../wrs-reject-report/wrs-reject-report.component';
import { CheckWarrantyStatusComponent } from './check-warranty-status/check-warranty-status.component';
import { ReportsComponent } from './reports/reports.component';
import { WRSResolverService } from 'src/app/core/services/user/wrs-data-resolver.service';
import { ServiceEscalationComponent } from './service-escalation/service-escalation.component';
import { AddCreatorComponent } from '../add-creator/add-creator.component';
import { BhmrComponent } from './bhmr/bhmr.component';
// import {RegisteredProductsComponent} from './registered-products/registered-products.component'
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'youtube', component: YouTubeVideosComponent },
  {path:'faq',component:FaqComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'dealer-options',component:DealerOptionsComponent},
  {path:'check-warranty', component: CheckWarrantyStatusComponent},
  {path:'reports', component: ReportsComponent},
  {path:'service-escalation', component: ServiceEscalationComponent},
  {path:'ads-creator', component: AddCreatorComponent},
  {path:'wrs-report',component:WrsRejectReportComponent,
  resolve: {
    posts: WRSResolverService
  }
},
  {path:'check-warranty', component: CheckWarrantyStatusComponent},
  {path:'bhmr', component: BhmrComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}