import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-secondary-device',
  templateUrl: './secondary-device.component.html',
  styleUrls: ['./secondary-device.component.css']
})
export class SecondaryDeviceComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }
  mobileInput:string;
  confirmMobileInput:string;
  deviceId: any;
  id:any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      this.id = params.id;
      this.deviceId = params.device;
    })
  }

  addDevice(){
    //console.log('submit', this.mobileInput, this.confirmMobileInput);
    this.userService.getUserProfile().subscribe((data:any)=>{
       const {BusinessName,Anniversary,Birthday,secondaryDevice1,secondaryDevice2,profileImg} = data;

      let obj = {
        "BusinessName":BusinessName,
        "anniversaryDate":Anniversary,
        "dob":Birthday,
        "profileImg":"",
        "secondaryDevice1":"",
        "secondaryDevice2":""
      }
      if(data && data.Status=="200"){
        if(this.id =="1"){
          obj['secondaryDevice1'] = this.confirmMobileInput;
        }else{
          obj['secondaryDevice2'] = this.confirmMobileInput;
        }
        
       this.userService.updateUserProfile(obj).subscribe((user:any)=>{
         console.log('updated user', user);
         if(user && user.Status == "200"){
          this.router.navigate(['dashboard/user-info']);
         }else{
           alert(user.Message);
         }
       })
      }else{
        console.log('User profile api error', data.Message );
      }
    })
    
  }

  deleteDevice(device:any){
    console.log('delete device', device);
    
    const obj = {
      'phoneNumber':device
    }
    this.userService.deleteUserDevice(obj).subscribe((data:any)=>{
      console.log('delete resp', data);
      if(data && data.Status == '200'){
        alert(data.Message);
        this.router.navigate(['dashboard/user-info']);
      }else{
        console.log('Delete device api error', data.Message);
      }
      
    })
  }

}
