import { NgModule } from '@angular/core';

import { SchemeRoutingModule } from './schemes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SchemesComponent } from './schemes/schemes.component';
import { SchemesCardComponent } from './schemes-card/schemes-card.component';

@NgModule({
  imports: [
    SchemeRoutingModule,
    SharedModule
  ],
  declarations: [
    SchemesComponent,
    SchemesCardComponent
  ]
})
export class SchemesModule {
}