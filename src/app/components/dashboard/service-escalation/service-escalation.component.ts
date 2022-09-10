import { Component, OnInit } from '@angular/core';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-service-escalation',
  templateUrl: './service-escalation.component.html',
  styleUrls: ['./service-escalation.component.css']
})
export class ServiceEscalationComponent implements OnInit {

  displayedColumns=['Title','Description']

  constructor(private ewarranty: EWarrantyService, private userService: UserService) { }
  stateList:any;
  matrixList:any[]=[];
  ngOnInit(): void {
    this.ewarranty.getStateList().subscribe((data:any)=>{
      this.stateList = data;
    })
  }

  onStateChange(state:any){
    this.matrixList=[]
    this.userService.getServiceEscalation(state.value).subscribe((data:any)=>{
      console.log('escalation data', data);
      if(data && data.Status == '200'){

        data.escalation_matrix.forEach((element:any) => {
          this.matrixList.push({
            'Title':element.ServiceCenterName,
            'Description':element.Address
          })
        });
        console.log(this.matrixList)
        // this.matrixList = data.escalation_matrix;
      }else {
        console.log('Escalation matrix api error', data.Message);
      }
    })
  }

}
