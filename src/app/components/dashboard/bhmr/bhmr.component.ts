import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/core/services/catalog/catalog.service';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-bhmr',
  templateUrl: './bhmr.component.html',
  styleUrls: ['./bhmr.component.css']
})
export class BhmrComponent implements OnInit {

  constructor(private catalogService: CatalogService, private userService: UserService,private ewarranty: EWarrantyService) { }
  showSharePdf:boolean=false
  showPdf: boolean = false;
  pdfUrl: any;
  activeCategory='6';
  bhmrCategories:any;
  bhmrCard:any;
  stateList:any;
  cityList:any;
  state:string;
  collectionCenters:any;
  showCollectionCenter = false;
  ngOnInit(): void {
    this.catalogService.getParentCategory().subscribe((res) => {
      if (res && res.Status === '200') {
       this.bhmrCategories = res.parent_category.filter((ct:any)=>ct.PageName === 'BMHR');
       this.selectCategory(this.bhmrCategories[0].Id);
      } else {
        console.log('Parent category api error:',res.Message);
      }
    });
  }

  selectCategory(id:string){
    this.activeCategory=id;
    if(id.toString() == '6'){
      this.userService.getBhmrCards(id).subscribe((data)=>{
        this.bhmrCard = data.BHMR_page[0];
      })
    }else {
      this.showCollectionCenter = true;
      this.collectionCenters = null;
      this.getStates();
    }
    
  }

  getStates(){
    this.ewarranty.getStateList().subscribe((data:any)=>{
      this.stateList = data;
    })
  }
  onStateChange(state:any){
    const {StateName} = this.stateList.find((st:any)=> st.StateID == state.value);
    this.state = StateName;
    this.ewarranty.getCityList(state.value).subscribe((data:any)=>{
      this.cityList = data;
    })
  }

  onCityChange(city:any){
    const {CityName} = this.cityList.find((st:any)=> st.CityName == city.value);

    this.userService.getBhmrCollectionCenterData(this.state, CityName).subscribe((cData)=>{
      this.collectionCenters = cData;
    })

  }

  openPdf(pdfData: any) {
    this.showPdf = true;
    this.pdfUrl = pdfData;
  }
  hidePdf() {
    this.showPdf = false;
  }

  sharePdf(){
    this.showSharePdf=!this.showSharePdf
  }


  sharePdfUrl(pdfData: any){
    this.pdfUrl = pdfData;

  }
}
