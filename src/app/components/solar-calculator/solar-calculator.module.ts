import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolarCalculatorRoutingModule } from './solar-calculator-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OnGridComponent } from './on-grid/on-grid.component';
import { SelectRequirementComponent } from './select-requirement/select-requirement.component';
import { OnGridSystemComponent } from './on-grid-system/on-grid-system.component';
import { OffGridComponent } from './off-grid/off-grid.component';
import { SelectAppliancesComponent } from './select-appliances/select-appliances.component';
import { OffGridCalculatorComponent } from './off-grid-calculator/off-grid-calculator.component';
import { SolarSolutionComponent } from './solar-solution/solar-solution.component';
import { SolarFeaturesComponent } from './solar-features/solar-features.component';


@NgModule({
  declarations: [
    OnGridComponent,
    SelectRequirementComponent,
    OnGridSystemComponent,
    OffGridComponent,
    SelectAppliancesComponent,
    OffGridCalculatorComponent,
    SolarSolutionComponent,
    SolarFeaturesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SolarCalculatorRoutingModule
  ]
})
export class SolarCalculatorModule { }
