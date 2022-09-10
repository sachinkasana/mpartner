import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { InstallationService } from 'src/app/core/services/service-installation/service-installation.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.css']
})
export class CheckStatusComponent implements OnInit {
  displayedColumns = [
    'Status',
    'PhoneNo',
    'ProductName',
    'ApplicationNo',
    'Date',
    'RequestType'
    
  ];
  dataSource:any;

  serviceInstallationData:any;
  filteredData:any;
  phoneNumber:any='';
  showOTPPopup=false;
  selectedItem:any;
  OTPInput:any;
  TransID:string;
  otpDesc:string;
  timeLeft: number = 120;
  interval:any;
  showResendOtp=false;
  constructor(private installationService:InstallationService,private router:Router,
    private eWarrantyService: EWarrantyService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getStatusList();
  }

  getStatusList(){
    this.installationService.getStatusList().subscribe((data:any)=>{
      console.log('data',data);
      this.dataSource=data.Data
      this.filteredData=data.Data;
      this.serviceInstallationData=data.Data;
    })
  }

  searchByPhoneNumber(){
    if(!this.phoneNumber || this.phoneNumber==''){
      this.filteredData=[...this.serviceInstallationData];
    }
    else{
    this.filteredData= this.serviceInstallationData.filter((data:any)=>{
      return data.PhoneNo.includes(this.phoneNumber);
    })
  }
  }

  verifyStatus(item:any){
    if(item.Status=='Not Verified'){
      this.selectedItem=item;
      let user_id=this.storageService.getItem('userId');
      this.eWarrantyService.createSerialOtp(item.SerialNo,item.PhoneNo,user_id).subscribe((data:any)=>{
        console.log('create otp',data)
        if(data.Code=="SUCCESS"){
          this.startTimer();
          this.showOTPPopup=true;
          this.TransID=data.TransID;
          this.otpDesc=data.des;
        }
      })
    }
  }

  verifyOTP(){
    let user_id=this.storageService.getItem('userId');
    this.eWarrantyService.verifySerialOtp(this.selectedItem.SerialNo,this.selectedItem.PhoneNo,user_id,this.OTPInput,this.TransID).subscribe((data:any)=>{
      console.log('create otp',data)
      if(data.Code=="SUCCESS"){
        this.showOTPPopup=false;
      }
    })
  }

  

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.showResendOtp=true;
        this.timeLeft = 0;
      }
    },1000)
  }

  redirectToBack(){
    this.router.navigateByUrl('/dashboard/service-installation')
  }
}
