import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerOtpComponent } from './consumer-otp/consumer-otp.component';
import {ConsumerPhoneNumberComponent} from './consumer-phone-number/consumer-phone-number.component'
import { ConsumerPincodeComponent } from './consumer-pincode/consumer-pincode.component';
import { ConsumerEmiComponent } from './consumer-emi.component';

const routes: Routes = [
  { path: '', component: ConsumerEmiComponent ,
  children:[
    { path: '', component: ConsumerPhoneNumberComponent },
    { path: 'otp', component: ConsumerOtpComponent },
    { path: 'pincode', component: ConsumerPincodeComponent },

  ]
  },


  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerEmiRoutingModule { }
