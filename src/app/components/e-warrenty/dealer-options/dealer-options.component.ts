import { Component, OnInit } from '@angular/core';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';

@Component({
  selector: 'app-dealer-options',
  templateUrl: './dealer-options.component.html',
  styleUrls: ['./dealer-options.component.css']
})
export class DealerOptionsComponent implements OnInit {

  dealerList:any;
  constructor(private ewarranty:EWarrantyService) { 
 
  }

  ngOnInit(): void {
    this.ewarranty.getDealerList().subscribe((data:any)=>{
      if(data && data.Status== '200'){
        this.dealerList = data.FinelabList;
      }else{
        console.log('Block Dealer list api error', data.Message);
        
      }
    })
   }

   dealerAction(user:any,state: number){
     console.log('dealer status ', user, state);

     this.dealerList = this.dealerList.map((dealer:any)=>{
        if(dealer.UserId == user.UserId){
          dealer.Blocked = state == 1? 0 : 1;
        }
        return dealer;
     })
     
   }

}
