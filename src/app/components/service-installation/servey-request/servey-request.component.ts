import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstallationService } from 'src/app/core/services/service-installation/service-installation.service';

@Component({
  selector: 'app-servey-request',
  templateUrl: './servey-request.component.html',
  styleUrls: ['./servey-request.component.css']
})
export class ServeyRequestComponent implements OnInit {

  serviceInstallationData:any;
  constructor(private installationService:InstallationService,private router:Router) { }

  ngOnInit(): void {
    this.getServiceRequestData();
  }

  getServiceRequestData(){
    this.installationService.getServiceRequest().subscribe(data=>{
      console.log('data',data);
      this.serviceInstallationData=data.Data;
    })
  }

  onRequestClick(id:number){
    switch(id){
      case 1:
        this.router.navigateByUrl('dashboard/service-installation/scan-serail-number');
        break;
      case 2:
          this.router.navigateByUrl('dashboard/service-installation/check-status');
          break;
    }
  }

}
