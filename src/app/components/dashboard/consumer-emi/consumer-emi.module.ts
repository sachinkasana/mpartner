import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerPhoneNumberComponent } from './consumer-phone-number/consumer-phone-number.component';
import { ConsumerOtpComponent } from './consumer-otp/consumer-otp.component';
import { ConsumerPincodeComponent } from './consumer-pincode/consumer-pincode.component';
import {ConsumerEmiRoutingModule} from './consumer-emi-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ConsumerPhoneNumberComponent,
    ConsumerOtpComponent,
    ConsumerPincodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConsumerEmiRoutingModule
  ]
})
export class ConsumerEmiModule { }
