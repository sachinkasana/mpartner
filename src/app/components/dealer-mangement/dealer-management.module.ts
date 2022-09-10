import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DealerManagementRoutingModule } from './dealer-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { DealerManagementComponent } from './dealer-management/dealer-management.component';
import { DealerListComponent } from './dealer-list/dealer-list.component';
import { DealerStatusComponent } from './dealer-status/dealer-status.component';
import { CreateDealerComponent } from './create-dealer/create-dealer.component';
import { UpdateDocumentsComponent } from './update-documents/update-documents.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  imports: [
    DealerManagementRoutingModule,
    TranslateModule,
    SharedModule,
    MatAutocompleteModule
  ],
  declarations: [
    DealerManagementComponent,
    DealerListComponent,
    DealerStatusComponent,
    CreateDealerComponent,
    UpdateDocumentsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class DealerManagementModule {
}