import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { SolarService } from 'src/app/core/services/solar/solar.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-on-grid',
  templateUrl: './on-grid.component.html',
  styleUrls: ['./on-grid.component.css'],
})
export class OnGridComponent implements OnInit {
  constructor(
    private solarService: SolarService,
    private router: Router
  ) {}
  showForm = false;
  stateList: any;
  cityList: any;
  userCity:any;
  userState:any;
  propertyType: string;
  user = {
    pincode: '',
    state: '',
    city: '',
    bill: null,
  };

  ngOnInit(): void {
    this.getStateList();
  }

  getStateList(){
    this.solarService.getStateMaster().subscribe((data: any) => {
      this.stateList = data.StateList;
    });
  }

  updatePincode(val:any){
    if(val.length == 6){
      this.user.pincode = val;
      this.solarService.getSolarOnGridPincodeData(val).subscribe((data)=>{
        if(data && data.data){
          console.log('pincode data', data);
          const district_data = data.data && data.data.district_data.length >0 && data.data.district_data[0];
          const state_data = data.data && data.data.states_data.length >0 && data.data.states_data[0]; 
          this.userState = state_data.name;
          this.userCity = district_data.name;
          this.getStateList();
          this.onStateChange({value:state_data.name});
          
        }else{
          console.log('Error message in solar calc pincode api', data.error_message);
        }
        
      })
    }
    
  }

  onStateChange(state: any) {
    const {StateID} = this.stateList.find((st:any)=> st.StateName == state.value);
    this.user.state = StateID;
    this.solarService.getCityMaster(StateID).subscribe((data: any) => {
      this.cityList = data.DistrictList;
    });
  }

  onCityChange(city: any) {
    const { DistrictID } = this.cityList.find(
      (ct: any) => ct.DistrictName == city.value
    );
    this.user.city = DistrictID;
  }

  chooseProperty(type: string) {
    this.showForm = true;
    this.propertyType = type;;
  }

  submit() {
    console.log('submit form called', this.user);
    const jsonBody = {
      bck_up_time: '',
      bill_in: this.user.bill,
      city: this.user.city,
      inverter_type: '1',
      load_bck_up: '',
      pincode: this.user.pincode,
      state: this.user.state,
      type: this.propertyType,
    };
    this.solarService.getSolarOnGridData(jsonBody).subscribe((data)=>{
      if(data && data.error_code == 0){
        console.log('solar on grid data', data);
        this.solarService.setOnGridData(data.data);
        this.router.navigate(['dashboard/solar-calculator/on-grid-system']);
      } else{
        console.log('OnGrid output api failed',data.error_message);
      }
    })
  }

  back(){
    this.router.navigate(['dashboard/solar-calculator']);
  }
}
