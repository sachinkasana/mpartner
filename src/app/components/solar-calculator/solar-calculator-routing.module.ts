import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffGridComponent } from './off-grid/off-grid.component';
import { OnGridSystemComponent } from './on-grid-system/on-grid-system.component';
import { OnGridComponent } from './on-grid/on-grid.component';
import { SelectRequirementComponent } from './select-requirement/select-requirement.component';
import { SelectAppliancesComponent } from './select-appliances/select-appliances.component';
import { OffGridCalculatorComponent } from './off-grid-calculator/off-grid-calculator.component';
import { SolarSolutionComponent } from './solar-solution/solar-solution.component';
import { SolarFeaturesComponent } from './solar-features/solar-features.component';

const routes: Routes = [
  { path: '', component: SelectRequirementComponent },
  { path: 'on-grid', component: OnGridComponent },
  { path: 'on-grid-system', component: OnGridSystemComponent },
  { path: 'off-grid', component: OffGridComponent },
  { path: 'select-appliance', component: SelectAppliancesComponent },
  { path: 'off-grid-calculator', component: OffGridCalculatorComponent },
  { path: 'off-grid-calculator/:totalLoad', component: OffGridCalculatorComponent },
  { path: 'solar-solution', component: SolarSolutionComponent },
  { path: 'solar-features', component: SolarFeaturesComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolarCalculatorRoutingModule {}
