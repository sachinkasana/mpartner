import { NgModule } from '@angular/core';

import { PriceListRoutingModule } from './price-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PricelistComponent } from './pricelist/pricelist.component';
import { PricelistCardComponent } from './pricelist-card/pricelist-card.component';

@NgModule({
  imports: [
    PriceListRoutingModule,
    SharedModule
  ],
  declarations: [
    PricelistComponent,
    PricelistCardComponent
  ]
})
export class PriceListModule {
}