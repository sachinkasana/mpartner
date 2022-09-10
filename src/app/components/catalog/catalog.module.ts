import { NgModule } from '@angular/core';

import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogSubProductsComponent } from './catalog-sub-products/catalog-sub-products.component';
import { CatalogProductsComponent } from './catalog-products/catalog-products.component';
import { BannerNavigateComponent } from '../e-warrenty/banner-navigate/banner-navigate.component';
import { CatalogSharedService } from 'src/app/core/services/catalog-shared.service';

@NgModule({
  imports: [
    CatalogRoutingModule,
    SharedModule
  ],
  declarations: [
    CatalogComponent,
    CatalogProductsComponent,
    CatalogSubProductsComponent,
   // BannerNavigateComponent
  ],
  providers:[CatalogSharedService]
})
export class CatalogModule {
}