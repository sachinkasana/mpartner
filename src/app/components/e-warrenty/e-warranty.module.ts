import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EWarrantyRoutingModule } from './e-warranty-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EWarrantyComponent } from './e-warranty/e-warranty.component';
import { TransferPointsComponent } from './transfer-points/transfer-points.component';
import { RedeemPointsComponent } from './redeem-points/redeem-points.component';
import { TranslateModule } from '@ngx-translate/core';
import { BannerNavigateComponent } from './banner-navigate/banner-navigate.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RewardsComponent } from './rewards/rewards.component';
import { ScanQrCodeComponent } from './scan-qr-code/scan-qr-code.component';
import { SerialNumberListComponent } from './serial-number-list/serial-number-list.component';
import { ConsumerDetailComponent } from './consumer-detail/consumer-detail.component';
import { PinelabComponent } from './pinelab/pinelab.component';

@NgModule({
  imports: [
    EWarrantyRoutingModule,
    TranslateModule,
    SharedModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": false,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": false
      
    })
  ],
  declarations: [
    EWarrantyComponent,
    TransferPointsComponent,
    RedeemPointsComponent,
    RewardsComponent,
    ScanQrCodeComponent,
    SerialNumberListComponent,
    ConsumerDetailComponent,
    PinelabComponent
   // BannerNavigateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class EWarrantyModule {
}