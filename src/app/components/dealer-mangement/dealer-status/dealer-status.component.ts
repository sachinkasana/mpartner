import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealerManagementService } from 'src/app/core/services/dealer-management/dealer-management.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-dealer-status',
  templateUrl: './dealer-status.component.html',
  styleUrls: ['./dealer-status.component.css']
})
export class DealerStatusComponent implements OnInit {

  constructor(private dealerManagementService:DealerManagementService,private router:Router, public storageService: StorageService) { }
  dataSource:any;
  displayedColumns:any;
  displayedColumnsDisty = [
    'Status',
    'PhoneNo',
    'DealerCode',
    'DealerName',
    'Date',
    'Remarks'
    
  ];

  displayedColumnsDealer = [
    'Status',
    'Date',
    'Remarks'
    
  ];
  
  serviceInstallationData:any;
  filteredData:any;
  phoneNumber:any='';
  showOTPPopup=false;
  selectedItem:any;
  ngOnInit(): void {
    this.getStatusList();
    if(this.storageService.getItem('userType')=='DISTY'){
      this.displayedColumns = this.displayedColumnsDisty;
    }else{
      this.displayedColumns = this.displayedColumnsDealer;
    }
  }

  getStatusList(){
    this.dealerManagementService.getDealerStatusList().subscribe((data:any)=>{
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
  
  redirectToBack(){
    this.router.navigateByUrl('/dashboard/dealer-management')
  }
}
