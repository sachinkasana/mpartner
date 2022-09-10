import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemesComponent } from './schemes/schemes.component';

const routes: Routes = [
  { path: '', component: SchemesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SchemeRoutingModule {
}