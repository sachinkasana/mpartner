import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import {UserProfileComponent  } from "./user-profile/user-profile.component";
import { SharedModule } from '../shared/shared.module';
import { UserInfoComponent } from "./user-info.component";
import { SecondaryDeviceComponent } from './secondary-device/secondary-device.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserInfoComponent,
    SecondaryDeviceComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    SharedModule
  ]
})
export class UserInfoModule { }
