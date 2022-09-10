import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent  } from "./user-profile/user-profile.component";
import { SecondaryDeviceComponent } from "./secondary-device/secondary-device.component";
import { UserInfoComponent } from "./user-info.component";

const routes: Routes = [
  {path:'',component:UserInfoComponent,
  children:[
    {path:'',component:UserProfileComponent},
    {path:'device',component:SecondaryDeviceComponent},
  ]
},
  
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }
