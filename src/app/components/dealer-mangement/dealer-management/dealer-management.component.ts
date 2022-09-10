import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DealerManagementService } from 'src/app/core/services/dealer-management/dealer-management.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {

  constructor(private _router:Router, public storageService:StorageService,
    private dealerManagementService:DealerManagementService,
    private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  createNewDealer(){
    this._router.navigateByUrl('/dashboard/dealer-management/create-dealer')
    
  }

updateDocument(){
  this.dealerManagementService.getDealerStatus().subscribe(data=>{
    console.log('dealer status data', data);
    if(data && data.Status == "200" && data.DealerStatus !=="Pending"){
      this._router.navigateByUrl('/dashboard/dealer-management/update-documents')  
    }else{
      this.toaster.error(data.Message);
    }
  });
  
}
dealerList(){
  this._router.navigateByUrl('/dashboard/dealer-management/dealer-list')  
}
status(){
this._router.navigateByUrl('/dashboard/dealer-management/dealer-status')
}
}
