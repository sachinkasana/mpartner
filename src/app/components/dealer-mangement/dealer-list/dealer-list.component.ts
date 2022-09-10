import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DealerManagementService } from 'src/app/core/services/dealer-management/dealer-management.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.css']
})
export class DealerListComponent implements OnInit {

  dealerList: any;
  filteredDealerList: Observable<any>;
  namecontrol = new FormControl('');
  showDealerCard = false;
  dealerCard:any;
  searchcontent:any;
  filteredDealers:any[];
  selectedDealer:any;
  showSuggestions=false;
  filterOptionList = ['All','Inactive','Active'];
  constructor(private dealerManagentService: DealerManagementService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getDealerList();
    this.filteredDealerList = this.namecontrol.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): any {
    console.log('filter vale', value);
    const filterValue = value && this._normalizeValue(value);
    //return this.dealerList.filter((dealer:any) => this._normalizeValue(dealer).includes(filterValue));
    var result = this.dealerList.filter(function(v:any, i:any) {
      return (v["DEALER_COD"].toLowerCase().includes(filterValue) || v["DEALER_NAME"].toLowerCase().includes(filterValue) || v["MOBILE1"].toLowerCase().includes(filterValue));
    });

    return result;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getDealerList() {
    const user_id = this.storageService.getItem('userId');
    const to_date = new Date();
    const dateSendingToServer = new DatePipe('en-US').transform(
      to_date,
      'dd/MM/yyyy'
    );
    this.dealerManagentService.viewDealerList(user_id, dateSendingToServer).subscribe(res => {
      this.dealerList = res;
      console.log('dealer list', this.dealerList);
    })
  }


  FetchItemDetailsSearch(input:any){
    if(input.length>=3){
      this.showSuggestions=true;
      this.filteredDealers =  this._filter(input);
    }
    else{
      this.showSuggestions=false;
    }
 
  console.log('results',this.filteredDealers)
  }

  selectDealer(selectedDealer:any){
    this.showSuggestions=false;
    console.log(selectedDealer);
    this.searchcontent=selectedDealer.DEALER_NAME
    this.showDealerCard=true;
    this.selectedDealer=selectedDealer;
  }


}
