import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerEmiService } from 'src/app/core/services/consumer-emi/consumer-emi.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-consumer-phone-number',
  templateUrl: './consumer-phone-number.component.html',
  styleUrls: ['./consumer-phone-number.component.css']
})
export class ConsumerPhoneNumberComponent implements OnInit {

  mobile:string;
  formValid = false;
  constructor(private router:Router,private route: ActivatedRoute, private consumerService:ConsumerEmiService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  verify(){
    if(this.mobile){
      this.formValid = false;
      const userId = this.storageService.getItem('userId');
      this.consumerService.createConsumerOTP(userId,this.mobile).subscribe((data:any)=>{
        if(data && data.Status === 'SUCCESS'){
          this.router.navigate(['otp'],{relativeTo: this.route})
        }else{
          console.log('Consumer emi otp error', data.Message);
        }
      })
    }else {
      this.formValid = true;
    }

  }
}
