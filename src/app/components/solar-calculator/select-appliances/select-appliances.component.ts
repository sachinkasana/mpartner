import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-appliances',
  templateUrl: './select-appliances.component.html',
  styleUrls: ['./select-appliances.component.css']
})
export class SelectAppliancesComponent implements OnInit {
  homeApplianceList =  [
    {
      'id': 1,
      'appliance': 'Ceiling Fan',
      'quantity': 1,
      'wattage': 75
    },
    {
      'id': 2,
      'appliance': 'Table Fan',
      'quantity': 1,
      'wattage': 50
    },
    {
      'id': 3,
      'appliance': 'Room Cooler',
      'quantity': 1,
      'wattage': 250
    },
    {
      'id': 4,
      'appliance': 'Tubelight',
      'quantity': 1,
      'wattage': 40
    },
    {
      'id': 5,
      'appliance': 'Tubelight',
      'quantity': 1,
      'wattage': 20
    },
    {
      'id': 6,
      'appliance': 'CFL Heavy',
      'quantity': 1,
      'wattage': 30
    },
    {
      'id': 7,
      'appliance': 'CFL Kight',
      'quantity': 1,
      'wattage': 15
    },
    {
      'id': 8,
      'appliance': 'LED Bulb',
      'quantity': 1,
      'wattage': 9
    },
    {
      'id': 9,
      'appliance': 'LED Bulb',
      'quantity': 1,
      'wattage': 5
    },
    {
      'id': 10,
      'appliance': 'Light Bulb (Incandescent)',
      'quantity': 1,
      'wattage': 40
    },
    {
      'id': 11,
      'appliance': 'Light Bulb (Incandescent)',
      'quantity': 1,
      'wattage': 60
    },
    {
      'id': 12,
      'appliance': 'Light Bulb (Incandescent)',
      'quantity': 1,
      'wattage': 100
    },
    {
      'id': 13,
      'appliance': 'Television LED (upto 40")',
      'quantity': 1,
      'wattage': 60
    },
    {
      'id': 14,
      'appliance': 'Television CRT (upto 21")',
      'quantity': 1,
      'wattage': 100
    },
    {
      'id': 15,
      'appliance': 'Television Plasma',
      'quantity': 1,
      'wattage': 250
    },
    {
      'id': 16,
      'appliance': 'SetTopBox (DTH)',
      'quantity': 1,
      'wattage': 50
    },
    {
      'id': 17,
      'appliance': 'Music System',
      'quantity': 1,
      'wattage': 300
    },
    {
      'id': 18,
      'appliance': 'Gaming Console',
      'quantity': 1,
      'wattage': 200
    },
    {
      'id': 19,
      'appliance': 'Laptop',
      'quantity': 1,
      'wattage': 100
    },
    {
      'id': 20,
      'appliance': 'Desktop computer',
      'quantity': 1,
      'wattage': 200
    },
    {
      'id': 21,
      'appliance': 'Printer Laser (Small)',
      'quantity': 1,
      'wattage': 200
    },
    {
      'id': 22,
      'appliance': 'Surveillance System',
      'quantity': 1,
      'wattage': 100
    },
    {
      'id': 23,
      'appliance': 'Juicer Mixer Grinder',
      'quantity': 1,
      'wattage': 800
    },
    {
      'id': 24,
      'appliance': 'Toaster',
      'quantity': 1,
      'wattage': 800
    },
    {
      'id': 25,
      'appliance': 'Refrigerator (upto 200L)',
      'quantity': 1,
      'wattage': 300
    },
    {
      'id': 26,
      'appliance': 'Refrigerator (upto 500L)',
      'quantity': 1,
      'wattage': 500
    },
    {
      'id': 27,
      'appliance': 'Water Pump (0.5 HP)',
      'quantity': 1,
      'wattage': 400
    },
    {
      'id': 28,
      'appliance': 'Water Pump (1 HP)',
      'quantity': 1,
      'wattage': 800
    },
    {
      'id': 29,
      'appliance': 'Airconditioner (1 Ton, 3 star)',
      'quantity': 1,
      'wattage': 1200
    },
    {
      'id': 30,
      'appliance': 'Airconditioner (1.5 Ton, 3 star)',
      'quantity': 1,
      'wattage': 1700
    },
    {
      'id': 31,
      'appliance': 'Airconditioner (2 Ton, 3 star)',
      'quantity': 1,
      'wattage': 2300
    },
    {
      'id': 32,
      'appliance': 'Airconditioner (1 Ton, Inverter)',
      'quantity': 1,
      'wattage': 1100
    },
    {
      'id': 33,
      'appliance': 'Airconditioner (1.5 Ton, Inverter)',
      'quantity': 1,
      'wattage': 1600
    },
    {
      'id': 34,
      'appliance': 'Airconditioner (2 Ton, Inverter)',
      'quantity': 1,
      'wattage': 2100
    },
    {
      'id': 35,
      'appliance': 'Microwave Oven',
      'quantity': 1,
      'wattage': 1400
    },
    {
      'id': 36,
      'appliance': 'Vacuum Cleaner',
      'quantity': 1,
      'wattage': 1400
    },
    {
      'id': 37,
      'appliance': 'Washing Machine',
      'quantity': 1,
      'wattage': 1000
    },
    {
      'id': 38,
      'appliance': 'Geyser / Water Heater',
      'quantity': 1,
      'wattage': 2200
    },
    {
      'id': 39,
      'appliance': 'Room Heater',
      'quantity': 1,
      'wattage': 2200
    },
    {
      'id': 40,
      'appliance': 'PhotoCopier',
      'quantity': 1,
      'wattage': 2200
    },
    {
      'id': 41,
      'appliance': 'Office Printer/Scanner',
      'quantity': 1,
      'wattage': 2000
    },
    {
      'id': 42,
      'appliance': 'Petrol Filling Machine',
      'quantity': 1,
      'wattage': 1500
    },
    {
      'id': 43,
      'appliance': 'Projector',
      'quantity': 1,
      'wattage': 600
    }
  ];

  displayedColumns = [
    'appliance',
    'quantity',
    'wattage'
  ];

  appliancesList=<any>[];
  selectedAppliance=<any>[];
  totalWattage=0;
  
  constructor(private router: Router) { 
   
  }

  ngOnInit(): void {
   
  }

  next(){
       console.log('ongrid called');
       if(this.totalWattage>0){
        this.router.navigate([`dashboard/solar-calculator/off-grid-calculator/${this.totalWattage}`]);
       }
  }

  addQuantity(item:any){
    console.log('item',item);
    const homeAppliances= [...this.homeApplianceList];
    const selectedAppliance=homeAppliances.filter((elem)=>{
      return elem.id==item.id
    })
    item.quantity=item.quantity+1;
    item.wattage=item.wattage+selectedAppliance[0].wattage;
    this.getTotalWattage();
  }

  removeQuantity(item:any){
    console.log('item',item);
    item.quantity=item.quantity-1;
    const homeAppliances= [...this.homeApplianceList];
    const selectedAppliance=homeAppliances.filter((elem)=>{
      return elem.id==item.id
    })
    item.wattage=item.wattage-selectedAppliance[0].wattage;
    this.getTotalWattage();
  }

  selectAppliance(item:any){
    console.log(item);
    const homeAppliances=[...this.homeApplianceList];
    const selectedHomeAppliances=homeAppliances.filter((elem)=>{
      return elem.id==item
    })
    this.selectedAppliance= JSON.parse(JSON.stringify(selectedHomeAppliances))
    this.getTotalWattage();
  }

  addHomeAppliance(){
    const index = this.appliancesList.findIndex((elem:any) => elem.id === this.selectedAppliance[0].id);
    if (index === -1) {
    this.appliancesList=this.appliancesList.concat(this.selectedAppliance);
    }
    this.getTotalWattage();
  }


  deleteAppliance(item:any){
    let appliances=this.appliancesList;
    appliances = appliances.filter(function(elem:any) {
      return elem.id !== item.id
  })
  this.appliancesList=appliances;
  this.getTotalWattage();
    // const index = this.appliancesList.findIndex((elem:any) => elem.id === item.id);
    // if(index>-1){
    //   this.appliancesList=this.appliancesList.slice(index,1);
    // }
    console.log('this.appliancesList',this.appliancesList)
  }

  getTotalWattage(){
    this.totalWattage = this.appliancesList.reduce((accumulator:any, object:any) => {
      return accumulator + object.wattage;
    }, 0);
  }
}
