import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EPointsService } from 'src/app/core/services/epoints/e-points.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-transfer-points',
  templateUrl: './transfer-points.component.html',
  styleUrls: ['./transfer-points.component.css'],
})
export class TransferPointsComponent implements OnInit {
  transferModes: any;
  from_mode:string;
  to_mode:string;
  toTranferModes:any;
  showPointsInput = false;
  paytmAmt:string;
  branchVoucherAmt:string;
  availablePoints:string;
  inputPoints:any
  constructor(
    private storageService: StorageService,
    private epoints: EPointsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paytmAmt = this.storageService.getItem('PaytmAmt');
    this.branchVoucherAmt = this.storageService.getItem('brandVoucherAmt');
    this.epoints.getTransferModeList().subscribe((data: any) => {
      console.log('mode list', data);
      if (data && data.Status == '200') {
        this.transferModes = data.Data;
      } else {
        console.log('Mode list api error', data.Message);
      }
    });
  }

  onFromModeChange(mode:any){
    const {title} = this.transferModes.find((m:any)=> m.id == mode.value);
    this.from_mode = title;
    this.toTranferModes = this.transferModes.filter((m:any)=> m.id !==mode.value);
    this.showPoints(title);
  }

  showPoints(type:string){
    this.showPointsInput = true;
    if(type === 'PayTm Wallet'){
      this.availablePoints = this.paytmAmt;
    }else{
      this.availablePoints = this.branchVoucherAmt;
    }
  }

  onToModeChange(mode:any){
    const {title} = this.toTranferModes.find((m:any)=> m.id == mode.value);
    this.to_mode = title;
  }

  submit(){
    console.log('submit', this.from_mode, this.to_mode, this.availablePoints, this.inputPoints);
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    const obj = {
      "from_available":this.availablePoints,
      "from_mode":this.from_mode,
      "to_available":"",
      "to_mode":this.to_mode,
      "token":token,
      "transfer_point":this.inputPoints.toString(),
      "user_id":userId
    }
    
    this.epoints.saveTranferPoints(obj).subscribe((data:any)=>{
      console.log('save transfer point data', data);
      alert(data.Message);
      this.router.navigate(['dashboard/e-warranty']);
    })
  }

  gotoBack(){
    this.router.navigate(['dashboard/e-warranty/redeem-points']);
  }
}
