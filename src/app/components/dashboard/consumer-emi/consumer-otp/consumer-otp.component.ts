import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsumerEmiService } from 'src/app/core/services/consumer-emi/consumer-emi.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-consumer-otp',
  templateUrl: './consumer-otp.component.html',
  styleUrls: ['./consumer-otp.component.css'],
})
export class ConsumerOtpComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private consumerService: ConsumerEmiService,
    private toastr: ToastrService
  ) {}
  otp: string;
  verifyDisabled = false;
  ngOnInit(): void {}

  next() {
    if (this.otp) {
      this.verifyDisabled = false;
      const userId = this.storageService.getItem('userId');
      this.consumerService
        .getConsumerOTPAuthentication(userId, this.otp)
        .subscribe((data: any) => {
          if (data && data.Status.toLowerCase() === 'success') {
            this.router.navigate(['dashboard/consumer-emi/pincode']);
          } else {
            console.log('Consumer emi otp error', data.Message);
            this.toastr.error( data.Message);
            this.otp = '';
            
          }
        });
    }else {
      this.verifyDisabled = true;
    }
  }
}
