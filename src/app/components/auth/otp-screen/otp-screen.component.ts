import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';
import {StorageService} from '../../../core/services/storage/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-screen',
  templateUrl: './otp-screen.component.html',
  styleUrls: ['./otp-screen.component.css'],
})
export class OtpScreenComponent implements OnInit {
  constructor(private service: CommonService, private router: Router, private storage: StorageService,private toastr: ToastrService) {}
  user: any = {};
  ngOnInit(): void {
    // this.user['mobile'] = this.storage.getItem('mobile');
    const msg = this.storage.getItem('otpMessage');
    let msgArr:any[] = msg.split(' ');
    this.user['mobile'] = msgArr[msgArr.length -1];
    msgArr.pop();
    this.user['otpMessage'] =  msgArr.join(' ');
  }

  onSubmit() {
    const { otp } = this.user;
    const uid = this.storage.getItem('userId') || '';

    this.service.otpAuthentication(uid, otp).subscribe((response) => {
      if (response && response.Status === 'SUCCESS') {
        this.service.userVerification(uid, this.user.mobile).subscribe((response) => {
          if (response && response.Status === '200') {
            this.toastr.info(response.Message)
            this.storage.setItem('token', response.Token);
            this.storage.removeItem('otpMessage');
            this.router.navigateByUrl('/dashboard');
          } else {
            //alert(response.Message);
            this.toastr.error(response.Message)
          }
        });
      }else {
        //alert(response.Message);
        this.toastr.error(response.Message)
      }
    });
  }

  byPass(){
    this.router.navigate(['/dashboard'])

  }
}
