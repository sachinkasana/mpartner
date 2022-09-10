import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerEmiService } from 'src/app/core/services/consumer-emi/consumer-emi.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-consumer-pincode',
  templateUrl: './consumer-pincode.component.html',
  styleUrls: ['./consumer-pincode.component.css'],
})
export class ConsumerPincodeComponent implements OnInit {
  constructor(
    private consumerService: ConsumerEmiService,
    private storageService: StorageService,
    private router:Router
  ) {}
  pincode: string;
  showHDFC: boolean = false;
  showError = false;
  smDetails: any;
  verifyDisabled = true;
  ngOnInit(): void {
  }

  updatePincode(event:string){
    event = event.toString();
    if(event.length === 6){
      this.pincode = event;
      this.verifyDisabled = false;
    }else{
      this.verifyDisabled = true;
    }
  }

  next() {
    if (this.pincode) {
      this.showError = false;
      console.log('called', this.pincode);
      let obj = {
        pinCode: this.pincode,
        user_id: this.storageService.getItem('userId'),
        token: this.storageService.getItem('token'),
      };

      this.consumerService.getRoSmDetails(obj).subscribe((data: any) => {
        console.log('ro sm details', data);
        if (data && data.Status == '200') {
          this.showHDFC = true;
          this.smDetails = data;
        } else {
          console.log('Consumer emi pincode api', data.Message);
          this.showHDFC = false;
          this.showError = true;
        }
      });
    }
  }

  
  goBack(){
    this.router.navigate(['dashboard/consumer-emi']);
  }

}
