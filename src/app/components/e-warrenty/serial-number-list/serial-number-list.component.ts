import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-serial-number-list',
  templateUrl: './serial-number-list.component.html',
  styleUrls: ['./serial-number-list.component.css'],
})
export class SerialNumberListComponent implements OnInit {
  constructor(private router: Router, private globalService: GlobalService) {}

  serialList: any;

  totalPoints =0;
  totalTripPoints =0;

  ngOnInit(): void {

    this.serialList = this.globalService.getWarrantyData();
    if(!this.serialList){
      localStorage.removeItem('serialNumbers')
      this.router.navigate(['dashboard/e-warranty/scanned-qr-code'])
    }
    // this.serialList = [
    //   {
    //     Code: 'Accepted: ',
    //     des: 'XYZ 20',
    //     slno: 'XYZ001g1500007',
    //     wrspoint: '20',
    //   },
    //   {
    //     Code: 'Accepted: ',
    //     des: 'ABC 10',
    //     slno: 'XYZ001g1500006',
    //     wrspoint: '10',
    //   },
    // ];

    this.serialList.forEach((sl:any)=>{
        if(sl && sl.wrspoint !==''){
          this.totalPoints = this.totalPoints + parseInt(sl.wrspoint); 
        }
    })

    this.serialList.forEach((sl:any)=>{
      if(sl && sl.trippoint !==''){
        this.totalTripPoints = this.totalTripPoints + parseInt(sl.trippoint); 
      }
  })
  }

  continueScanning() {
    this.router.navigate(['dashboard/e-warranty']);
  }
}
