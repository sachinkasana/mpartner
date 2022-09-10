import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDealerComponent } from './create-dealer/create-dealer.component';
import { DealerListComponent } from './dealer-list/dealer-list.component';
import { DealerManagementComponent } from './dealer-management/dealer-management.component';
import { DealerStatusComponent } from './dealer-status/dealer-status.component';
import { UpdateDocumentsComponent } from './update-documents/update-documents.component';

const routes: Routes = [
  { path: '', component: DealerManagementComponent },
  { path: 'create-dealer', component: CreateDealerComponent },
  { path: 'dealer-status', component: DealerStatusComponent },
  { path: 'update-documents', component: CreateDealerComponent },
  { path: 'dealer-list', component: DealerListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DealerManagementRoutingModule {
}