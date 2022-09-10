import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HomeService } from '../../../core/services/home/home.service';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {
  showSharePdf:boolean=false;
  showPdf: boolean = false;
  pdfUrl: any;
  selectedUser='';

  constructor(private userService: UserService, public storageService:StorageService) {}
  schemeList: any;
  ngOnInit(): void {
    this.selectedUser='DEALER';
    this.getSchemeData('DEALER')
  }

  getSchemeData(selectedUserType:string){
    try {
      this.userService.getSchemePageCards(selectedUserType).subscribe((res) => {
        if (res && res.Status === '200') {
          this.schemeList = res && res.scheme_data;
        } else {
          console.log(res.Message);
        }
      });
    } catch (e) {
      console.log('Exception occured scheme card', e);
    }
  }

  openPdf(pdfData: any) {
    this.showPdf = true;
    this.pdfUrl = pdfData;
  }

  hidePdf() {
    this.showPdf = false;
  }

  sharePdf(){
    console.log(this.showSharePdf)
    this.showSharePdf=!this.showSharePdf
  }

  onTabChange(userType:string){
    this.selectedUser=userType;
    this.getSchemeData(userType);
  }
}
