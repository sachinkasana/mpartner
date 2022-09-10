import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { InstallationService } from 'src/app/core/services/service-installation/service-installation.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import Utils from 'src/app/core/utils/helper.util';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  user={
    name:"",
    landline:"",
    state:"",
    city:"",
    address:"",
    salesDate:"",
    imgId:"",
    modelName:"",
    category:"",
    cutomerName:"",
    customerContactNo:"",
    customerAlternateNo:"",
    Address:"",
    locality:"",
    type:"",
    serialNumber:"",
    user_id:"",
    token:""
  };
  
  stateList:any;
  cityList:any;
  typesOfService:any;
  imgName:any;
  imgBase64:any;
  imageList:any;
  imageId:any="730";
  routerData:any;
  selectedFileType='';
  maxDate=new Date();
  isValidFormSubmitted = false;  
  constructor(private installationService:InstallationService,private eWarrantyService: EWarrantyService,
     private storageService: StorageService, private router:Router,private activatedRoute:ActivatedRoute,
     private toaster: ToastrService) { 
       //this.routerData= this.router.getCurrentNavigation().extras.state['Model_Name'] ||'';
  }
 
  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params => {
      this.routerData=params
      console.log('routerData',params)
      this.user.category=this.routerData.Product_Type;
      this.user.modelName=this.routerData.Model_Name;
      this.user.serialNumber=this.routerData.serialNumber;
      console.log(params); // { order: "popular" }
    }
  );
    
    this.getStateList();
    this.getTypesOfService();
    this.getUploadedImages();
    this.imageList = [];
  }

  getStateList(){
    this.eWarrantyService.getStateList().subscribe((data:any)=>{
      console.log('stateList',data)
      this.stateList = data;
    })
  }

  getTypesOfService(){
    this.installationService.getTypesOfService().subscribe(data=>{
      console.log('typesOfService',data)
      this.typesOfService=data.Data;
    })
  }

  onStateChange(state:any){
    const {StateName} = this.stateList.find((st:any)=> st.StateID == state.value);
    this.user.state = StateName;
    this.eWarrantyService.getCityList(state.value).subscribe((data:any)=>{
      this.cityList = data;
      console.log('cityList',data)
    })
  }


  onServiceTypeChange(service:any){
    console.log('change service',service);
    const {title} = this.typesOfService.find((st:any)=> st.title == service.value);
    this.user.type = title;
    console.log('type',this.user.type)
    //this.user.type=service.value;
  }

  getUploadedImages(){
    this.installationService.getUploadedImageList().subscribe((data:any)=>{
      console.log('images',data)
      this.imageList = data.Data || [];
    })
  }

  deleteUploadedImages(image:any){
    this.installationService.deleteImage({imgId:image.Id}).subscribe((data:any)=>{
      console.log('deleteUploadedImages',data)
      this.imageList = data.Data;
    })
  }
  
 
  submit(form: NgForm){
    if (form.invalid) {  
      this.isValidFormSubmitted = true;  
       return;  
    }  
    this.isValidFormSubmitted = false;  
    console.log('submit called', this.user);
    const userId = this.storageService.getItem('userId');
    const token = this.storageService.getItem('token');
    this.user.imgId=this.imageList.map(function(elem:any){
      return elem.Id;
  }).join(",");
  this.user.token=token;
  this.user.user_id=userId;
    console.log('user obj', this.user);

    this.installationService.submitRequest(this.user).subscribe((data:any)=>{
      console.log('save cutomer scheeme', data);
      if(data.Status=="200"){
        this.toaster.error(data.Message);
        this.router.navigateByUrl('dashboard/service-installation/check-status');
      }
      else{
        alert(data.Message);
      }
    })

  }

  handleInputChange(e:any) {
    if(this.imageList.length<3){
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.imgName=file.name;
    this.selectedFileType=file.type;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  else{
    alert('Max 3 files can be uploaded');
  }
  }
  _handleReaderLoaded(e:any) {
    let reader = e.target;
    this.imgBase64 = reader.result;
    this.imgBase64 = Utils.removeBase64(this.imgBase64,this.selectedFileType);
    console.log(this.imgBase64)
    this.uploadImage();
  }

  uploadImage(){
    const req={'imgBase64':this.imgBase64,'imgName':this.imgName}
    this.installationService.uploadImage(req).subscribe((data:any)=>{
      console.log('images',data)
      this.getUploadedImages();
    })
  }
  redirectToBack(){
    this.router.navigateByUrl('/dashboard/service-installation')
  }

}
