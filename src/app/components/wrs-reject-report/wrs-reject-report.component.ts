import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { UserService } from 'src/app/core/services/user/user.service';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-wrs-reject-report',
  templateUrl: './wrs-reject-report.component.html',
  styleUrls: ['./wrs-reject-report.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class WrsRejectReportComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  month: any;
  year: any;
  Pdf_url: string;
  today: any;
  sixMonthsAgo = new Date();
  maxMonthsAgo: any;
  date: any;
  displayedColumns = [
    'Serial_Number',
    'Product_des',
    'Entered_By_Code',
    'Customer_Phone',
    'Ew_ViaVerified',
    'Remark_after_verification',
    'Points',
    'Month',
    'Year',
    'Final_Remarks'
  ];
  dataSource: any =[];

  ngOnInit(): void {
    let data = this._route.snapshot.data['posts'];
    this.date = new FormControl(new Date());
    console.log('data', data);
    if (data && data.Data) {
      this.today = new Date();
      this.sixMonthsAgo = new Date();
      this.maxMonthsAgo = new Date();
      this.sixMonthsAgo.setMonth(this.today.getMonth() - data.Data[0].month);
      this.maxMonthsAgo.setFullYear(
        this.today.getFullYear() - data.Data[0].year
      );
      this.month = data.Data[0].month;
      this.year = data.Data[0].year;
      this.getUserWRSData();
    } else {
      this.toastr.error('No Date Found');
    }
  }

  getUserWRSData() {
    const obj = {
      month: this.month,
      year: this.year,
    };
    console.log('obj', obj);
    this.userService.getUserWRSData(obj).subscribe((data: any) => {
      if ((data && data.Status == '200') || data.Status == '0') {
        this.dataSource = data.Rejected_point_data || [];
        this.Pdf_url = data.Pdf_url;
      } else {
        console.log('WRS report api error', data.Message);
      }
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.setFullYear(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.setMonth(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    console.log('selected date', this.date.value);
    this.month = this.date.value.getMonth() + 1;
    this.year = this.date.value.getFullYear();
    datepicker.close();
    this.getUserWRSData();
  }
}
