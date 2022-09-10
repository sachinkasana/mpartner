import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  confirmShow=false;
  constructor(private userService: UserService, private toastr: ToastrService) { }
  selectedReport:any;
  reportType:any;

  reports = [
    {
      id:1,
      name:'Primary Billing Report',
      type:'PRIMARY_RECV_REPORT_REV1',
      emailType:'Distributor_Primary_Billing_Report'
    },
    {
      id:2,
      name:'Customer Ledger Report',
      type:'DISTRIBUTOR_LEDGER_REV1',
      emailType:'Distributor_Ledger_Report'
    },
    {
      id:3,
      name:'Credit/Debit Note Report',
      type:'DISTRIBUTOR_CRDR_REV1',
      emailType:'Distributor_Credit_Debit_Report'
    }
  ];

  displayedColumnsReport1 = [
    'INV_NO',
    'INVOICE_DA',
    'ITEM_CODE',
    'ITEM_NAME',
    'QTY',
    'PRE_TAX_AMT',
    'TAX',
    'GROSS_AMOUNT',
    'CHANNEL_NAME',
    'DIVISION'   
  ];

  displayedColumnsReport21 = [
    'DATE',
    'CC_AREA',
    'DOC_NO',
    'DOC_TYPE',
    'CHANNEL'
  ];

  displayedColumnsReport22 = [
    'DATE',
    'CC_AREA',
    'DOC_NO',
    'DOC_TYPE',
    'CHANNEL',
    'DIVISION',
    'REFERENCE',
    'REF_DATE',
    'DEBIT_AMT',
    'CREDIT_AMT',
    'RUN_BAL',
    'CR_DR'
  ];

  displayedColumnsReport23 = [
    'CC_AREA',
    'CC_DESC',
    'OUTSTANDING',
    'CONFIRM_AR',
    'PENDING_AR'
  ];

  displayedColumnsReport3 = [
    'DOC_NO',
    'DOC_DATE',
    'GROSS_AMOUNT',
    'Heading'
  ];


  startDate:any;
  endDate:any;
  primaryReport:any;
  ledgerReport1:any;
  ledgerReport2:any;
  // ledgerReport2= [
  //   {
  //     "DOC_DATE": "2022-05-28",
  //     "DOC_NO": "1800063689",
  //     "DO": "RV",
  //     "DI": "05",
  //     "DI1": "00",
  //     "REF_ORG_UN": "102203006820",
  //     "ALLOC_NMBR": "",
  //     "REF_DATE": "2022-05-28",
  //     "DEBIT_AMOUNT": "2085847.00",
  //     "CREDIT_AMOUNT": "0.00",
  //     "CHANNEL_TXT": "Luminous Channel",
  //     "DIVISION_TXT": "Common Division",
  //     "DOC_TYP_TXT": "Sales Invoice",
  //     "TOTAL_CREDIT": "2085847.00",
  //     "EXTENDED_CREDIT_LIMI": "0.00",
  //     "CONT": "ZPSB",
  //     "CONTROL_AREA_DESC": "ZPSB",
  //     "DEALER": "Dr",
  //     "DEALER_NAME": "",
  //     "CDRC": "Dr"
  //   }
  // ];
  ledgerReport3:any;

  creditDebitReport:any
  ngOnInit(): void {
    this.reportType = 1;
  }

  selectReport(){
    const fromDate = this.formatDate(this.startDate);
    const toDate = this.formatDate(this.endDate);
    const {type,emailType} =  this.reports.find((r:any)=> r.id == this.reportType)!;
    const diff = this.endDate- this.startDate;
    this.selectedReport = this.reportType;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
    if(days > 7){
      if(confirm("Want to send reports on Email? ")) {
        this.sendReportEmail(emailType, fromDate,toDate);
      }
    }else {
      this.getReports(type, fromDate,toDate);
    }
    
  }

  onReportChange(report:any){
    this.selectedReport = null;
  }

  formatDate(date:Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }

  getReports(type:string, fromDate: string, toDate: string){
    this.userService.getUserReport(type, fromDate, toDate).subscribe((data:any)=>{
      if(data && data.status=='200'){
        if(this.selectedReport == 1){
          this.primaryReport = data.Detail;
        } else if(this.selectedReport == 2){
          this.ledgerReport1 = data.Confirm_AR_ReportData;
          this.ledgerReport2 = data.Pending_AR_ReportData;
          this.ledgerReport3 = data.SUMMARY_ReportData;

        }else{
          this.creditDebitReport = data.DRCR_ReportData
        }
      }else{
        console.log('Report data api error', data);
      }

    })
  }

  emailToMe(){
    const fromDate = this.formatDate(this.startDate);
    const toDate = this.formatDate(this.endDate);
    const {type,emailType} =  this.reports.find((r:any)=> r.id == this.selectedReport)!;
    this.sendReportEmail(emailType, fromDate,toDate);
  }

  sendReportEmail(type:string,fromDate: string, toDate: string){
    console.log('email report called', type, fromDate, toDate);
  
    this.userService.sendEmailReport(type,fromDate,toDate,'','','','','','').subscribe((data:any)=>{
      console.log('send email report api data', data);
      //alert(data.Message)
      this.toastr.success(data.Message)
    })
  }

  getTotalOutstanding() {
    return this.ledgerReport3.map((t:any) => t.TOT_OPENING).reduce((acc:any, value:any) => acc + parseInt(value), 0);
  }

  getConfirmAr(){
    return this.ledgerReport3.map((t:any) => t.POD_CONFIRM).reduce((acc:any, value:any) => acc + parseInt(value), 0);

  }

  getPendingAr(){
    return this.ledgerReport3.map((t:any) => t.POD_PENDING).reduce((acc:number, value:any) => acc + parseInt(value), 0);

  }

  popupConfirm(confirm:boolean){
    this.confirmShow=false;
    if(confirm){

    }

  }
}


