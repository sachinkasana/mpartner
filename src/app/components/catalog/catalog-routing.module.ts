import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogSubProductsComponent } from './catalog-sub-products/catalog-sub-products.component';
import { CatalogComponent } from './catalog/catalog.component';


const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'detail', component: CatalogSubProductsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CatalogRoutingModule {
}