import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-off-grid-calculator',
  templateUrl: './off-grid-calculator.component.html',
  styleUrls: ['./off-grid-calculator.component.css'],
})
export class OffGridCalculatorComponent implements OnInit {
  backupTime:any;
  avgRunningLoad:any
  totalLoadPowerCut:any;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  form: FormGroup;
  submitted = false;
  table1: any;
  table2: any;
  table3: any;
  table4: any;
  table6: any;
  table8: any;
  userInputLoad: any;
  calculatedInverter: any;
  calculateBatteryVoltage: any;
  selectedRequiredDC: any;
  backupTimes:any;
  percentages:any;
  paramTotalLoad:any;
  isTotalLoadReadOnly=false;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    media: MediaMatcher,
    private formBuilder: FormBuilder,
    private _location: Location,
    private route : ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 799px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.initializeTable1();
    this.initializeTable2();
    this.initializeTable3();
    this.initializeTable4();
    this.initializeTable6();
  }

  ngOnInit(): void {
    this.paramTotalLoad = this.route.snapshot.paramMap.get('totalLoad'); 
    console.log('this.paramTotalLoad',this.paramTotalLoad)

    if (this.paramTotalLoad) {
       console.log('this.paramTotalLoad',this.paramTotalLoad)
    }
    this.form = this.formBuilder.group({
      totalLoad: ['', Validators.required],
      averageRunningLoad: ['', Validators.required],
      totalLoadPowerCut: ['', Validators.required],
      backupTime: ['', Validators.required],
    });
    this.backupTimes=[
      {
      time:'1-2',
      upperValue:2
    },
    {
      time:'2-3',
      upperValue:3
    },
    {
      time:'3-4',
      upperValue:4
    },
    {
      time:'4-5',
      upperValue:5
    },
    {
      time:'5-6',
      upperValue:6
    },
    {
      time:'6-7',
      upperValue:7
    },
    {
      time:'7-8',
      upperValue:8
    },
    {
      time:'8-9',
      upperValue:9
    },
    {
      time:'9-10',
      upperValue:10
    }
  ]
  this.percentages=[
    {
    percentage:'100%',
    value:100
  },
  {
    percentage:'75%',
    value:75
  },
  {
    percentage:'50%',
    value:50
  },
  {
    percentage:'25%',
    value:25
  }
]
if(this.paramTotalLoad){
  this.form.patchValue({
    totalLoad: this.paramTotalLoad
  });
  this.isTotalLoadReadOnly=true;
}
  }

  initializeTable1() {
    this.table1 = [];
    this.table1[0] = {};
    this.table1[0]['InverterVoltage'] = 12;
    this.table1[0]['InverterLoad'] = 100;
    this.table1[0]['RequiredDCBattery'] = 10;
    this.table1[1] = {};
    this.table1[1]['InverterVoltage'] = 24;
    this.table1[1]['InverterLoad'] = 200;
    this.table1[1]['RequiredDCBattery'] = 20;
    this.table1[2] = {};
    this.table1[2]['InverterVoltage'] = 36;
    this.table1[2]['InverterLoad'] = 300;
    this.table1[2]['RequiredDCBattery'] = 30;
    this.table1[3] = {};
    this.table1[3]['InverterVoltage'] = 48;
    this.table1[3]['InverterLoad'] = 400;
    this.table1[3]['RequiredDCBattery'] = 40;
    this.table1[4] = {};
    this.table1[4]['InverterVoltage'] = 96;
    this.table1[4]['InverterLoad'] = 800;
    this.table1[4]['RequiredDCBattery'] = 80;
    this.table1[5] = {};
    this.table1[5]['InverterVoltage'] = 120;
    this.table1[5]['InverterLoad'] = 1000;
    this.table1[5]['RequiredDCBattery'] = 100;
  }

  calculate() {
    this.router.navigate(['dashboard/solar-calculator/solar-solution']);
  }

  onBlur(){
    if(this.form.value.totalLoad & this.form.value.averageRunningLoad){
      let calculatedValue=(this.form.value.totalLoad *this.form.value.averageRunningLoad)/100;
      this.totalLoadPowerCut=calculatedValue
      this.form.patchValue({
        totalLoadPowerCut: calculatedValue
      });
    }
  }
  public onPercentageChange(event: any) {
    console.log('event',event)
    if(this.form.value.totalLoad){
      let calculatedValue=(this.form.value.totalLoad *event.value)/100;
      this.avgRunningLoad=calculatedValue
      this.form.patchValue({
        totalLoadPowerCut: calculatedValue
      });
    }
    else{
      alert('please enter total load first')
    }
    
   // localStorage.setItem('selectedLang',lang)
    //this.translate.use(lang);
  }

 public switchBackup(backup:any){
  this.backupTime=backup

 }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  initializeTable2() {
    this.table2 = [];
    this.table2[0] = {};
    this.table2[0]['HoursofDischarge'] = 10;
    this.table2[0]['CapacityExpressed'] = 100;
    this.table2[0]['EndVoltage'] = 1.85;
    this.table2[1] = {};
    this.table2[1]['HoursofDischarge'] = 9;
    this.table2[1]['CapacityExpressed'] = 97.9;
    this.table2[1]['EndVoltage'] = 1.84;
    this.table2[2] = {};
    this.table2[2]['HoursofDischarge'] = 8;
    this.table2[2]['CapacityExpressed'] = 95;
    this.table2[2]['EndVoltage'] = 1.84;
    this.table2[3] = {};
    this.table2[3]['HoursofDischarge'] = 7;
    this.table2[3]['CapacityExpressed'] = 91.7;
    this.table2[3]['EndVoltage'] = 1.83;
    this.table2[4] = {};
    this.table2[4]['HoursofDischarge'] = 6;
    this.table2[4]['CapacityExpressed'] = 87.9;
    this.table2[4]['EndVoltage'] = 1.83;
    this.table2[5] = {};
    this.table2[5]['HoursofDischarge'] = 5;
    this.table2[5]['CapacityExpressed'] = 83.3;
    this.table2[5]['EndVoltage'] = 1.82;
    this.table2[6] = {};
    this.table2[6]['HoursofDischarge'] = 4;
    this.table2[6]['CapacityExpressed'] = 78.2;
    this.table2[6]['EndVoltage'] = 1.81;
    this.table2[7] = {};
    this.table2[7]['HoursofDischarge'] = 3;
    this.table2[7]['CapacityExpressed'] = 71.7;
    this.table2[7]['EndVoltage'] = 1.8;
    this.table2[8] = {};
    this.table2[8]['HoursofDischarge'] = 2;
    this.table2[8]['CapacityExpressed'] = 63.3;
    this.table2[8]['EndVoltage'] = 1.78;
    this.table2[9] = {};
    this.table2[9]['HoursofDischarge'] = 1;
    this.table2[9]['CapacityExpressed'] = 50;
    this.table2[9]['EndVoltage'] = 1.75;
  }

  initializeTable3() {
    this.table3 = [];
    this.table3[0] = {};
    this.table3[0]['LoadLowerRange'] = 1;
    this.table3[0]['LoadUpperRange'] = 400;
    this.table3[0]['RecommendedInverter'] = 'NXG 850';
    this.table3[0]['Panel'] = '165Wp x 3 No.s';
    this.table3[0]['RooftopArea'] = 60;
    this.table3[1] = {};
    this.table3[1]['LoadLowerRange'] = 401;
    this.table3[1]['LoadUpperRange'] = 680;
    this.table3[1]['RecommendedInverter'] = 'NXG 1150';
    this.table3[1]['Panel'] = '165Wp x 5 No.s';
    this.table3[1]['RooftopArea'] = 100;
    this.table3[2] = {};
    this.table3[2]['LoadLowerRange'] = 681;
    this.table3[2]['LoadUpperRange'] = 880;
    this.table3[2]['RecommendedInverter'] = 'NXG 1450';
    this.table3[2]['Panel'] = '165Wp x 6 No.s';
    this.table3[2]['RooftopArea'] = 120;
    this.table3[3] = {};
    this.table3[3]['LoadLowerRange'] = 881;
    this.table3[3]['LoadUpperRange'] = 1200;
    this.table3[3]['RecommendedInverter'] = 'NXG 1850';
    this.table3[3]['Panel'] = '330Wp x 4 No.s';
    this.table3[3]['RooftopArea'] = 140;
    this.table3[4] = {};
    this.table3[4]['LoadLowerRange'] = 1201;
    this.table3[4]['LoadUpperRange'] = 1600;
    this.table3[4]['RecommendedInverter'] = 'SOLARVERTER PRO 2kVA';
    this.table3[4]['Panel'] = '330Wp x 6 No.s';
    this.table3[4]['RooftopArea'] = 200;
    this.table3[5] = {};
    this.table3[5]['LoadLowerRange'] = 1601;
    this.table3[5]['LoadUpperRange'] = 2400;
    this.table3[5]['RecommendedInverter'] = 'SOLARVERTER PRO 3kVA';
    this.table3[5]['Panel'] = '330Wp x 9 No.s';
    this.table3[5]['RooftopArea'] = 300;
    this.table3[6] = {};
    this.table3[6]['LoadLowerRange'] = 2401;
    this.table3[6]['LoadUpperRange'] = 3000;
    this.table3[6]['RecommendedInverter'] = 'PCU NXT+ 3.75kVA';
    this.table3[6]['Panel'] = '330Wp x 9 No.s';
    this.table3[6]['RooftopArea'] = 300;
    this.table3[7] = {};
    this.table3[7]['LoadLowerRange'] = 3001;
    this.table3[7]['LoadUpperRange'] = 6000;
    this.table3[7]['RecommendedInverter'] = 'PCU NXT+ 7.5kVA';
    this.table3[7]['Panel'] = '330Wp x 20 No.s';
    this.table3[7]['RooftopArea'] = 600;
    this.table3[8] = {};
    this.table3[8]['LoadLowerRange'] = 6001;
    this.table3[8]['LoadUpperRange'] = 7500;
    this.table3[8]['RecommendedInverter'] = 'PCU NXT+ 9.5kVA';
    this.table3[8]['Panel'] = '330Wp x 24 No.s';
    this.table3[8]['RooftopArea'] = 750;
    this.table3[9] = {};
    this.table3[9]['LoadLowerRange'] = 7501;
    this.table3[9]['LoadUpperRange'] = 10000;
    this.table3[9]['RecommendedInverter'] = 'PCU NXT+ 12.5kVA';
    this.table3[9]['Panel'] = '330Wp x 30 No.s';
    this.table3[9]['RooftopArea'] = 1000;
  }

  initializeTable4() {
    this.table4 = [];
    this.table4[0] = {};
    this.table4[0]['BatteryLowerRange'] = 1;
    this.table4[0]['BatteryUpperRange'] = 20;
    this.table4[0]['RecommendedBattery'] = 20;
    this.table4[1] = {};
    this.table4[1]['BatteryLowerRange'] = 21;
    this.table4[1]['BatteryUpperRange'] = 40;
    this.table4[1]['RecommendedBattery'] = 40;
    this.table4[2] = {};
    this.table4[2]['BatteryLowerRange'] = 41;
    this.table4[2]['BatteryUpperRange'] = 60;
    this.table4[2]['RecommendedBattery'] = 60;
    this.table4[3] = {};
    this.table4[3]['BatteryLowerRange'] = 61;
    this.table4[3]['BatteryUpperRange'] = 80;
    this.table4[3]['RecommendedBattery'] = 80;
    this.table4[4] = {};
    this.table4[4]['BatteryLowerRange'] = 81;
    this.table4[4]['BatteryUpperRange'] = 100;
    this.table4[4]['RecommendedBattery'] = 100;
    this.table4[5] = {};
    this.table4[5]['BatteryLowerRange'] = 101;
    this.table4[5]['BatteryUpperRange'] = 120;
    this.table4[5]['RecommendedBattery'] = 120;
    this.table4[6] = {};
    this.table4[6]['BatteryLowerRange'] = 121;
    this.table4[6]['BatteryUpperRange'] = 150;
    this.table4[6]['RecommendedBattery'] = 150;
    this.table4[7] = {};
    this.table4[7]['BatteryLowerRange'] = 151;
    this.table4[7]['BatteryUpperRange'] = 200;
    this.table4[7]['RecommendedBattery'] = 200;
  }

  initializeTable6() {
    this.table6 = [];
    this.table6[0] = {};
    this.table6[0]['TotalPeakLoadInverter'] = 400;
    this.table6[0]['invertor'] = 'NXG 850';
    this.table6[0]['BatterySystemVoltage'] = 12;
    this.table6[0]['NoOfBatteriesSeries'] = 1;
    this.table6[0]['targetLoad'] = null;
    this.table6[0]['loadVoltage'] = null;
    this.table6[0]['selectedRequiredDC'] = null;
    this.table6[0]['selectedACVolatage'] = null;
    this.table6[0]['BackupTime'] = null;
    this.table6[0]['ACCurrentBKMode'] = null;
    this.table6[0]['CapacityExpressed'] = null;
    this.table6[0]['RecommendedBattery'] = null;
    this.table6[0]['batteryLimit'] = null;
    this.table6[0]['finalAH'] = null;
    this.table6[0]['batteryInParellel'] = null;
    this.table6[0]['noOfBatteries'] = null;
    this.table6[0]['finalBattery'] = null;
    this.table6[1] = {};
    this.table6[1]['TotalPeakLoadInverter'] = 680;
    this.table6[1]['invertor'] = 'NXG 1150';
    this.table6[1]['BatterySystemVoltage'] = 12;
    this.table6[1]['NoOfBatteriesSeries'] = 1;
    this.table6[1]['targetLoad'] = null;
    this.table6[1]['loadVoltage'] = null;
    this.table6[1]['selectedRequiredDC'] = null;
    this.table6[1]['selectedACVolatage'] = null;
    this.table6[1]['BackupTime'] = null;
    this.table6[1]['ACCurrentBKMode'] = null;
    this.table6[1]['CapacityExpressed'] = null;
    this.table6[1]['RecommendedBattery'] = null;
    this.table6[1]['batteryLimit'] = null;
    this.table6[1]['finalAH'] = null;
    this.table6[1]['batteryInParellel'] = null;
    this.table6[1]['noOfBatteries'] = null;
    this.table6[1]['finalBattery'] = null;
    this.table6[2] = {};
    this.table6[2]['TotalPeakLoadInverter'] = 880;
    this.table6[2]['invertor'] = 'NXG 1450';
    this.table6[2]['BatterySystemVoltage'] = 12;
    this.table6[2]['NoOfBatteriesSeries'] = 1;
    this.table6[2]['targetLoad'] = null;
    this.table6[2]['loadVoltage'] = null;
    this.table6[2]['selectedRequiredDC'] = null;
    this.table6[2]['selectedACVolatage'] = null;
    this.table6[2]['BackupTime'] = null;
    this.table6[2]['ACCurrentBKMode'] = null;
    this.table6[2]['CapacityExpressed'] = null;
    this.table6[2]['RecommendedBattery'] = null;
    this.table6[2]['batteryLimit'] = null;
    this.table6[2]['finalAH'] = null;
    this.table6[2]['batteryInParellel'] = null;
    this.table6[2]['noOfBatteries'] = null;
    this.table6[2]['finalBattery'] = null;
    this.table6[3] = {};
    this.table6[3]['TotalPeakLoadInverter'] = 1200;
    this.table6[3]['invertor'] = 'NXG 1850';
    this.table6[3]['BatterySystemVoltage'] = 24;
    this.table6[3]['NoOfBatteriesSeries'] = 2;
    this.table6[3]['targetLoad'] = null;
    this.table6[3]['loadVoltage'] = null;
    this.table6[3]['selectedRequiredDC'] = null;
    this.table6[3]['selectedACVolatage'] = null;
    this.table6[3]['BackupTime'] = null;
    this.table6[3]['ACCurrentBKMode'] = null;
    this.table6[3]['CapacityExpressed'] = null;
    this.table6[3]['RecommendedBattery'] = null;
    this.table6[3]['batteryLimit'] = null;
    this.table6[3]['finalAH'] = null;
    this.table6[3]['batteryInParellel'] = null;
    this.table6[3]['noOfBatteries'] = null;
    this.table6[3]['finalBattery'] = null;
    this.table6[4] = {};
    this.table6[4]['TotalPeakLoadInverter'] = 1600;
    this.table6[4]['invertor'] = 'SOLARVERTER PRO 2kVA';
    this.table6[4]['BatterySystemVoltage'] = 24;
    this.table6[4]['NoOfBatteriesSeries'] = 2;
    this.table6[4]['targetLoad'] = null;
    this.table6[4]['loadVoltage'] = null;
    this.table6[4]['selectedRequiredDC'] = null;
    this.table6[4]['selectedACVolatage'] = null;
    this.table6[4]['BackupTime'] = null;
    this.table6[4]['ACCurrentBKMode'] = null;
    this.table6[4]['CapacityExpressed'] = null;
    this.table6[4]['RecommendedBattery'] = null;
    this.table6[4]['batteryLimit'] = null;
    this.table6[4]['finalAH'] = null;
    this.table6[4]['batteryInParellel'] = null;
    this.table6[4]['noOfBatteries'] = null;
    this.table6[4]['finalBattery'] = null;
    this.table6[5] = {};
    this.table6[5]['TotalPeakLoadInverter'] = 2400;
    this.table6[5]['invertor'] = 'SOLARVERTER PRO 3kVA';
    this.table6[5]['BatterySystemVoltage'] = 36;
    this.table6[5]['NoOfBatteriesSeries'] = 3;
    this.table6[5]['targetLoad'] = null;
    this.table6[5]['loadVoltage'] = null;
    this.table6[5]['selectedRequiredDC'] = null;
    this.table6[5]['selectedACVolatage'] = null;
    this.table6[5]['BackupTime'] = null;
    this.table6[5]['ACCurrentBKMode'] = null;
    this.table6[5]['CapacityExpressed'] = null;
    this.table6[5]['RecommendedBattery'] = null;
    this.table6[5]['batteryLimit'] = null;
    this.table6[5]['finalAH'] = null;
    this.table6[5]['batteryInParellel'] = null;
    this.table6[5]['noOfBatteries'] = null;
    this.table6[5]['finalBattery'] = null;
    this.table6[6] = {};
    this.table6[6]['TotalPeakLoadInverter'] = 3000;
    this.table6[6]['invertor'] = 'PCU NXT+ 3.75kVA';
    this.table6[6]['BatterySystemVoltage'] = 48;
    this.table6[6]['NoOfBatteriesSeries'] = 4;
    this.table6[6]['targetLoad'] = null;
    this.table6[6]['loadVoltage'] = null;
    this.table6[6]['selectedRequiredDC'] = null;
    this.table6[6]['selectedACVolatage'] = null;
    this.table6[6]['BackupTime'] = null;
    this.table6[6]['ACCurrentBKMode'] = null;
    this.table6[6]['CapacityExpressed'] = null;
    this.table6[6]['RecommendedBattery'] = null;
    this.table6[6]['batteryLimit'] = null;
    this.table6[6]['finalAH'] = null;
    this.table6[6]['batteryInParellel'] = null;
    this.table6[6]['noOfBatteries'] = null;
    this.table6[6]['finalBattery'] = null;
    this.table6[7] = {};
    this.table6[7]['TotalPeakLoadInverter'] = 6000;
    this.table6[7]['invertor'] = 'PCU NXT+ 7.5kVA';
    this.table6[7]['BatterySystemVoltage'] = 96;
    this.table6[7]['NoOfBatteriesSeries'] = 8;
    this.table6[7]['targetLoad'] = null;
    this.table6[7]['loadVoltage'] = null;
    this.table6[7]['selectedRequiredDC'] = null;
    this.table6[7]['selectedACVolatage'] = null;
    this.table6[7]['BackupTime'] = null;
    this.table6[7]['ACCurrentBKMode'] = null;
    this.table6[7]['CapacityExpressed'] = null;
    this.table6[7]['RecommendedBattery'] = null;
    this.table6[7]['batteryLimit'] = null;
    this.table6[7]['finalAH'] = null;
    this.table6[7]['batteryInParellel'] = null;
    this.table6[7]['noOfBatteries'] = null;
    this.table6[7]['finalBattery'] = null;
    this.table6[8] = {};
    this.table6[8]['TotalPeakLoadInverter'] = 7500;
    this.table6[8]['invertor'] = 'PCU NXT+ 9.5kVA';
    this.table6[8]['BatterySystemVoltage'] = 120;
    this.table6[8]['NoOfBatteriesSeries'] = 10;
    this.table6[8]['targetLoad'] = null;
    this.table6[8]['loadVoltage'] = null;
    this.table6[8]['selectedRequiredDC'] = null;
    this.table6[8]['selectedACVolatage'] = null;
    this.table6[8]['BackupTime'] = null;
    this.table6[8]['ACCurrentBKMode'] = null;
    this.table6[8]['CapacityExpressed'] = null;
    this.table6[8]['RecommendedBattery'] = null;
    this.table6[8]['batteryLimit'] = null;
    this.table6[8]['finalAH'] = null;
    this.table6[8]['batteryInParellel'] = null;
    this.table6[8]['noOfBatteries'] = null;
    this.table6[8]['finalBattery'] = null;
    this.table6[9] = {};
    this.table6[9]['TotalPeakLoadInverter'] = 10000;
    this.table6[9]['invertor'] = 'PCU NXT+ 12.5kVA';
    this.table6[9]['BatterySystemVoltage'] = 120;
    this.table6[9]['NoOfBatteriesSeries'] = 10;
    this.table6[9]['targetLoad'] = null;
    this.table6[9]['loadVoltage'] = null;
    this.table6[9]['selectedRequiredDC'] = null;
    this.table6[9]['selectedACVolatage'] = null;
    this.table6[9]['BackupTime'] = null;
    this.table6[9]['ACCurrentBKMode'] = null;
    this.table6[9]['CapacityExpressed'] = null;
    this.table6[9]['RecommendedBattery'] = null;
    this.table6[9]['batteryLimit'] = null;
    this.table6[9]['finalAH'] = null;
    this.table6[9]['batteryInParellel'] = null;
    this.table6[9]['noOfBatteries'] = null;
    this.table6[9]['finalBattery'] = null;
  }

  setTargetLoadVolatage() {
    let self = this;
    for (let index = 0; index < this.table6.length; index++) {
      this.table6[index]['targetLoad'] = this.userInputLoad;
      this.table6[index]['loadVoltage'] =
        this.table6[index].TotalPeakLoadInverter < this.table6[index].targetLoad
          ? 0
          : this.table6[index].targetLoad;
      const requiredDcVolt = this.table1.filter(function (elem: any) {
        return elem.InverterVoltage == self.table6[index].BatterySystemVoltage;
      });

      this.table6[index]['selectedRequiredDC'] =
        requiredDcVolt[0].RequiredDCBattery;
      this.table6[index]['selectedACVolatage'] =
        this.table6[index].loadVoltage == 0
          ? 0
          : Math.round(
              this.table6[index].loadVoltage /
                this.table6[index].selectedRequiredDC
            );
      this.table6[index]['BackupTime'] = this.form.value.backupTime;
      this.table6[index]['ACCurrentBKMode'] = Math.round(
        this.table6[index].selectedACVolatage * this.table6[index].BackupTime
      );
      const batteryCapacityObj = this.table2.filter(function (elem: any) {
        return elem.HoursofDischarge == self.table6[index]['BackupTime'];
      });
      this.table6[index]['CapacityExpressed'] =
        batteryCapacityObj[0].CapacityExpressed;
      const batteryCapacity = this.table6[index].CapacityExpressed / 100;
      this.table6[index]['RecommendedBattery'] = Math.round(
        this.table6[index].ACCurrentBKMode / batteryCapacity
      );
      this.table6[index].batteryLimit =
        this.table6[index].RecommendedBattery > 200
          ? Math.round(this.table6[index].RecommendedBattery / 2)
          : this.table6[index].RecommendedBattery;

          if(this.table6[index].batteryLimit ==0){
            this.table6[index]['finalAH'] = 0;
          }else{
            const finalAH = this.table4.filter(function (elem: any) {
              return (
                elem.BatteryLowerRange < self.table6[index].batteryLimit &&
                elem.BatteryUpperRange >= self.table6[index].batteryLimit
              );
            });
            console.log('finalAH',finalAH)
            this.table6[index]['finalAH'] = finalAH.length>0? finalAH[0].RecommendedBattery:0;
          }

      this.table6[index]['batteryInParellel'] =
        this.table6[index].RecommendedBattery <= 200
          ? 1
          : Math.round(
              this.table6[index].RecommendedBattery /
                this.table6[index]['finalAH']
            );

      this.table6[index].noOfBatteries =
        this.table6[index].batteryInParellel > 0
          ? Math.round(
              this.table6[index].batteryInParellel *
                this.table6[index].NoOfBatteriesSeries
            )
          : this.table6[index].NoOfBatteriesSeries;
      this.table6[index].batteryCombination =
        this.table6[index].finalAH + 'Ahx' + this.table6[index].noOfBatteries;

      let output = '';
      if (
        this.table6[index].finalAH == 0 ||
        this.table6[index].batteryInParellel > 1
      ) {
        output = 'NA';
      } else {
        output = this.table6[index].batteryCombination;
      }
      this.table6[index].finalBattery = output;
    }
    console.log('tabled 6-->>>>>>>>>>>>>>>>>>', this.table6);
    this.getFinalResult();
  }

  getFinalResult(){
    let batteryResult: any;
    for (let index = 0; index < this.table6.length; index++) {
      if(this.table6[index].finalBattery !== 'NA'){
        batteryResult = this.table6[index];
        break;
      }
    }

    console.log('Final recommeded inverter-->>>>>>>>>>>>>>>>', batteryResult);
    if(batteryResult.invertor){
      var filterValue = this.table3.filter(function (elem: any) {
        return elem.RecommendedInverter == batteryResult.invertor;
      });
      console.log('filterValue',filterValue)
      batteryResult.Panel=filterValue.length>0?filterValue[0].Panel:'NA';
      batteryResult.RooftopArea=filterValue.length>0?filterValue[0].RooftopArea:'NA';
      sessionStorage.setItem('solar-solution',JSON.stringify(batteryResult));
  
      this.router.navigate(['dashboard/solar-calculator/solar-solution']);
    }else{
      alert('No recommended inverter found for this input')
    }
    
   
  }

  getRecommendedInverter() {
    let input = this.form.value;
    this.userInputLoad = input.totalLoadPowerCut;
   
    this.setTargetLoadVolatage();
    //this.getBatteraryVoltage();
  }

  back(){
    this._location.back();
  }

}
