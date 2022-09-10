import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';
import {StorageService} from '../../../core/services/storage/storage.service';
import { Router } from '@angular/router';
import { AuthGuardServiceService } from '../../../route-gaurd/auth-guard-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  popHeaderFlag=false;
  popFooterFlag=false;
  userLoggedIn = false;
  user: any = {};
  userData :any;
  selectedUser:any={};
  constructor(private service: CommonService,private router:Router, private storage: StorageService,private authGuardServiceService:AuthGuardServiceService) { }

  ngOnInit(): void {
    if (this.authGuardServiceService.getToken()) {
      this.router.navigate(['dashboard']);
    }
  }
  radioChange(user:any){
    this.selectedUser = user;
    console.log('this.user radio changes', this.user);
  }
  selectSAPID(){
    console.log('selected user', this.selectedUser);
    const {id,type} = this.selectedUser;
    const {mobile} = this.user;
    this.selectUser(mobile,id,type);
  }

  onSubmit(){
    const {mobile} = this.user;
    this.service.getUserData(mobile).subscribe((response) => {
      
      if(!response || !response.Data){
        alert(response.Message);
        this.user ={};
        return;
      }
     
      if(response && response.Data.length >1){
        this.userLoggedIn = true;
        this.userData = response && response.Data;
      } else {
        const uid = response.Data[0].id;
        const type = response.Data[0].type;
        this.selectUser(mobile,uid, type);
      }
     
    });
  }

  selectUser(mobile:string, uid:string, type:string){
    // console.log('mobile',mobile,uid,type);
    this.service.loginCreateOTP(mobile, uid).subscribe((response)=>{
      if(response && response.Status === 'SUCCESS'){
        this.storage.setItem('userId',uid);
        this.storage.setItem('mobile',mobile);
        this.storage.setItem('userType',type);
        this.storage.setItem('otpMessage',response.Message);
        this.router.navigateByUrl('/otp')
      } else {
        alert(response.Message);
        this.user ={};
      }
    })
  }

}
