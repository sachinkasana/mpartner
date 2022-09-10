import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeScannerComponent } from '../shared/qr-code-scanner/qr-code-scanner.component';
import { ScanQrCodeComponent } from './scan-qr-code/scan-qr-code.component';

import { EWarrantyComponent } from './e-warranty/e-warranty.component';
import { RedeemPointsComponent } from './redeem-points/redeem-points.component';
import { TransferPointsComponent } from './transfer-points/transfer-points.component';
import { RewardsComponent } from "./rewards/rewards.component";
import { SerialNumberListComponent } from './serial-number-list/serial-number-list.component';
import { ConsumerDetailComponent } from './consumer-detail/consumer-detail.component';
import { PinelabComponent } from './pinelab/pinelab.component';
import { DealerOptionsComponent } from './dealer-options/dealer-options.component';

const routes: Routes = [
  { path: '', component: EWarrantyComponent },
  { path: 'transfer-points', component: TransferPointsComponent },
  { path: 'redeem-points', component: RedeemPointsComponent },
  { path: 'open-qr-code', component: QrCodeScannerComponent },
  { path: 'scanned-qr-code', component: ScanQrCodeComponent },
  { path: 'rewards', component: RewardsComponent },
  {path:'serial-number-list', component: SerialNumberListComponent},
  {path:'consumer-detail', component: ConsumerDetailComponent},
  {path:'pinelab', component:PinelabComponent},
  {path:'dealer-options', component: DealerOptionsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EWarrantyRoutingModule {
}