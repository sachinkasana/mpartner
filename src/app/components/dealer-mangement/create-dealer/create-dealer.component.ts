import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DealerManagementService } from 'src/app/core/services/dealer-management/dealer-management.service';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import Utils from 'src/app/core/utils/helper.util';

@Component({
  selector: 'app-create-dealer',
  templateUrl: './create-dealer.component.html',
  styleUrls: ['./create-dealer.component.css']
})
export class CreateDealerComponent implements OnInit {
  doc1:any;
  doc2:any;

  doc3:any;
  doc4:any;

  showOTPAuthPopup: boolean = false;
  formValid = false;
  showDealerSucessPopup: boolean = false;
  otpAuthMessage: string;
  otpInput: any;
  isOtpValid = false;
  createDealerForm: FormGroup;
  form: FormGroup;
  formStep = "0";
  title = 'Create Dealer';
  imgName: any;
  imgBase64: any;
  doc1Type: string;
  doc2Type: string;
  selectedFileType = '';
  documentList: any[];
  document1List: any[];
  doc1List: any[];
  doc2List: any[];
  stateList: any;
  cityList: any;
  stateName: string;
  cityName: string;
  userInfo: any;
  panRegualarExpression: any;
  gstRegularExpression: any;
  isCreateDealer = true;
  lengthValidator = 12;
  constructor(private router: Router, private dealerManagentService: DealerManagementService,
    private ewarranty: EWarrantyService, private toaster: ToastrService, private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getStates();
    this.doc1List = [];
    this.doc2List = [];
    this.doc1=null;
    this.doc2=null;
    this.doc3=null;
    this.doc4=null;
    this.getDocumentList();
    this.panRegualarExpression = new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')
    this.gstRegularExpression = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
    this.createDealerForm = new FormGroup({
      firmDetails: new FormGroup({
        dealerFirmName: new FormControl('', Validators.required),
        //dealerFirmName: new FormControl(''),
        dealerName: new FormControl('', Validators.required),
        ownerName: new FormControl('', Validators.required),
        //ownerName: new FormControl(''),
        mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        //mobileNumber: new FormControl(''),
        emailId: new FormControl('')
      }),
      addressDetails: new FormGroup({
        address1: new FormControl('', Validators.required),
        //address1: new FormControl(''),
        address2: new FormControl(''),
        city: new FormControl('', [Validators.required,Validators.minLength(2)]),
        state: new FormControl(''),
        postalCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
        district: new FormControl(''),
      }),
      documentsDetails: new FormGroup({
        document1: new FormControl('', [Validators.required]),
        document1No: new FormControl('', [Validators.required, Validators.pattern(this.panRegualarExpression)]),
        document1File: new FormControl(''),
        document2: new FormControl('', Validators.required),
        document2No: new FormControl('', [Validators.required]),
        document2File: new FormControl(''),

      })
    })
    console.log('this.createDealerForm.controls', this.getFirmDetailsForm)
    console.log('this.router.url', this.router.url)
    if (this.router.url === '/dashboard/dealer-management/update-documents') {
      console.log('this.router.url', this.router.url)
      this.title = 'Update Dealer';
      this.isCreateDealer = false;
      setTimeout(() => { this.getUserProfileData() }, 0);
    }
  }

  keyPressAng(event: any) {
    if (event.target.value.length == this.lengthValidator) {
      event.preventDefault();
    }
  }

  getUserProfileData() {
    this.userService.getUserProfile().subscribe(data => {
      this.userInfo = data;
      this.setFormValues();
    })
  }

  getCreateDealerUserProfileData() {
    this.userService.getUserProfile().subscribe(data => {
      this.userInfo = data;
      let addressDetailsForm = this.createDealerForm.controls['addressDetails'] as FormGroup;
      this.getCityByState(this.userInfo.State || 'Delhi');
      addressDetailsForm.controls['state'].setValue(this.userInfo.State)
      addressDetailsForm.controls['state'].disable()
      addressDetailsForm.controls['district'].setValue(this.userInfo.District)
      addressDetailsForm.controls['district'].disable()
    })
  }

  setFormValues() {
    let firmDetailsForm = this.createDealerForm.controls['firmDetails'] as FormGroup;
    let addressDetailsForm = this.createDealerForm.controls['addressDetails'] as FormGroup;
    let documentsDetailsForm = this.createDealerForm.controls['documentsDetails'] as FormGroup;
    firmDetailsForm.controls['dealerFirmName'].setValue(this.userInfo.dealer_firm_name)
    firmDetailsForm.controls['dealerFirmName'].disable()
    firmDetailsForm.controls['dealerName'].setValue(this.userInfo.Name)
    firmDetailsForm.controls['dealerName'].disable()
    firmDetailsForm.controls['ownerName'].setValue(this.userInfo.owner_name)
    firmDetailsForm.controls['ownerName'].disable()
    firmDetailsForm.controls['mobileNumber'].setValue(this.userInfo.Phone)
    firmDetailsForm.controls['mobileNumber'].disable()
    firmDetailsForm.controls['emailId'].setValue(this.userInfo.Email)
    //this.getCityByState(this.userInfo.State)
    addressDetailsForm.controls['address1'].setValue(this.userInfo.Address1)
    addressDetailsForm.controls['address1'].disable()
    addressDetailsForm.controls['address2'].setValue(this.userInfo.Address2)
    addressDetailsForm.controls['address2'].disable()
    addressDetailsForm.controls['state'].setValue(this.userInfo.State)
    addressDetailsForm.controls['state'].disable()
    addressDetailsForm.controls['city'].setValue(this.userInfo.City)
    addressDetailsForm.controls['postalCode'].setValue(this.userInfo.pincode)
    addressDetailsForm.controls['postalCode'].disable()
    addressDetailsForm.controls['district'].setValue(this.userInfo.District)
    addressDetailsForm.controls['district'].disable()

  }

  get getDealerForm() {
    return this.createDealerForm;
  }

  get getFirmDetailsForm() {
    return this.createDealerForm.controls['firmDetails'];
  }

  get getAddressDetailsForm() {
    return this.createDealerForm.controls['addressDetails'];
  }

  get getDocumentsDetails() {
    return this.createDealerForm.controls['documentsDetails'];
  }

  getStates() {
    this.ewarranty.getStateList().subscribe((data: any) => {
      this.stateList = data;
      this.isCreateDealer && this.getCreateDealerUserProfileData();
    })
  }

  getCityByState(state: any) {
    let addressDetailsForm = this.createDealerForm.controls['addressDetails'] as FormGroup;

    const { StateID } = this.stateList.find((st: any) => st.StateName == state);

    this.stateName = StateID;
    this.ewarranty.getCityList(StateID).subscribe((data: any) => {
      this.cityList = data;
      //this.userInfo.City && addressDetailsForm.controls['city'].setValue(this.capitalizeFirstLetter(this.userInfo.City.toLowerCase()));
      !this.isCreateDealer && addressDetailsForm.controls['city'].disable();
    })
  }

  capitalizeFirstLetter(input: any) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  onStateChange(state: any) {
    const { StateName } = this.stateList.find((st: any) => st.StateID == state.value);
    this.stateName = StateName;
    this.ewarranty.getCityList(state.value).subscribe((data: any) => {
      this.cityList = data;
    })
  }

  onCityChange(city: any) {
    const { CityName } = this.cityList.find((st: any) => st.CityName == city.value);
    this.cityName = CityName;
    console.log('city', CityName);

  }

  getDocumentList() {
    this.dealerManagentService.getDocumentList().subscribe((data: any) => {
      console.log('images', data)
      this.documentList = data.Data;
      for (let index = 0; index < this.documentList.length; index++) {
        if (this.documentList[index].docname == "PAN of Proprietor/Firm/Company") {
          this.document1List = this.documentList.splice(index, 1);
        }

      }
      console.log(this.document1List, this.documentList)
      let documentsDetailsForm = this.createDealerForm.controls['documentsDetails'] as FormGroup;
      documentsDetailsForm.controls['document1'].setValue(this.document1List[0].id);


    })
  }

  onDocument1Change(doc: any) {
    console.log('change doc', doc);
    const { docname } = this.document1List.find((st: any) => st.id == doc.value);
    this.doc1Type = docname;
    console.log('type', docname)
    //this.user.type=service.value;
  }

  onDocument2Change(doc: any) {
    let documentDetailForm = this.createDealerForm.controls['documentsDetails'] as FormGroup;
    console.log('change doc', doc);
    documentDetailForm.controls['document2No'].setValue('');
    this.doc2List = [];
    const { docname } = this.documentList.find((st: any) => st.id == doc.value);
    this.doc2Type = docname;
    console.log('type', docname)

    if (this.doc2Type == "Aadhar Card") {
      this.lengthValidator = 12;
      documentDetailForm.controls['document2No'].setValidators([Validators.required,Validators.pattern('\\d{12}'),Validators.minLength(12), Validators.maxLength(12)])
      documentDetailForm.controls['document2No'].updateValueAndValidity()
    }
    else if (this.doc2Type == "GST Certificate") {
      this.lengthValidator = 15;
      documentDetailForm.controls['document2No'].setValidators([Validators.required,Validators.pattern(this.gstRegularExpression),Validators.minLength(15), Validators.maxLength(15)])
      documentDetailForm.controls['document2No'].updateValueAndValidity()
    }



    //this.user.type=service.value;
  }


  nextStep(step: string, form: string) {
    this.formValid = true;
    if (this.createDealerForm.controls[form].status == 'VALID' || (this.createDealerForm.controls[form].status == 'DISABLED')) {
      this.formStep = step;
      this.formValid = false;
    }
  }

  step4() {
    if (this.createDealerForm.controls['documentsDetails'].status == 'VALID') {
      this.formStep = "3";
    }
  }

  step3() {
    if (this.createDealerForm.controls['addressDetails'].status == 'VALID') {
      this.formStep = "2";
    }
  }

  submit() {
    if (this.createDealerForm.status == 'VALID') {
      if ((this.doc1 ==null && this.doc2==null) || (this.doc3 ==null && this.doc4==null)) {
        alert('please upload 2 files for both')
      }
      else {
        let requestBody = {
          "Country": "India",
          "address1": this.createDealerForm.getRawValue().addressDetails.address1,
          "address2": this.createDealerForm.getRawValue().addressDetails.address2,
          "city_code": this.createDealerForm.getRawValue().addressDetails.city,
          "city": this.cityName,
          "district": this.createDealerForm.getRawValue().addressDetails.district,
          "postal_code": this.createDealerForm.getRawValue().addressDetails.postalCode,
          "state": this.stateName,
          "state_code": this.createDealerForm.getRawValue().addressDetails.state,
          "document1_img1": this.doc1,
          "document1_img2": this.doc2,
          "document2_img1": this.doc3,
          "document2_img2": this.doc4,
          "document_type1": this.createDealerForm.getRawValue().documentsDetails.document1,
          "document_type2": this.createDealerForm.getRawValue().documentsDetails.document2,
          "document_no1": this.createDealerForm.getRawValue().documentsDetails.document1No,
          "document_no2": this.createDealerForm.getRawValue().documentsDetails.document2No,
          "email_id": this.createDealerForm.getRawValue().firmDetails.emailId,
          "mobile_no": this.createDealerForm.getRawValue().firmDetails.mobileNumber,
          "owner_name": this.createDealerForm.getRawValue().firmDetails.ownerName,
          "dealer_firm_name": this.createDealerForm.getRawValue().firmDetails.dealerFirmName,
          "dealer_name": this.createDealerForm.getRawValue().firmDetails.dealerName,
        }
        this.dealerManagentService.createUpdateDealer(requestBody).subscribe(res => {
          if (res.Status == "200") {
            this.toaster.success(res.Message);
            this.showDealerSucessPopup = true;
            //this.router.navigateByUrl('/dashboard/dealer-management')
          }
          else {
            this.toaster.error(res.Message)
          }
          console.log('res', res);
        })
        console.log('form', this.createDealerForm)
      }

    }
    else {
      alert('please fill all mandatory fields')
    }

  }

  back(step: string) {
    this.formStep = step;
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/dealer-management')
  }

  handleInputChange(e: any, doc: string) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files;
    // if (file.length > 2 || (doc == 'doc1' && this.doc1List.length >= 2) || (doc == 'doc2' && this.doc2List.length >= 2)) {
    //   alert('you can not upload more than 2 files');
    //   return;
    // }
    this.tobase64Handler(file, doc)
    // var pattern = /image-*/;
    // var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    // reader.onload = this._handleReaderLoaded.bind(this);
    // reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imgBase64 = reader.result;
    //this.imgBase64 = Utils.removeBase64(this.imgBase64,this.selectedFileType);
    console.log(this.imgBase64)

  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  async tobase64Handler(files: any, doc: string) {
    const filePathsPromises: any = [];
    [...files].forEach(file => filePathsPromises.push(this.toBase64(file)));

    // files.forEach((file:any) => {
    //   filePathsPromises.push(this.toBase64(file));
    // });
    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => ({ selectedFile: base64File }));
    for (let index = 0; index < mappedFiles.length; index++) {
      if (doc == 'doc1') {
        this.doc1=mappedFiles[index].selectedFile
        //this.doc1List.push(mappedFiles[index].selectedFile)
      }
      else if (doc == 'doc2') {
        this.doc2=mappedFiles[index].selectedFile
      }
      else if (doc == 'doc3') {
        this.doc3=mappedFiles[index].selectedFile
      }
      else if (doc == 'doc4') {
        this.doc4=mappedFiles[index].selectedFile
      }
     
    }

    console.log('mappedFiles', mappedFiles)
    return mappedFiles;
  }

  deleteFile(doc: string, index: number) {
    if (doc == 'doc1') {
      this.doc1=null;
      // this.doc1List.splice(index, 1);
    }else if(doc=='doc2'){
      this.doc2=null;
    }
      else if(doc=='doc3'){
        this.doc3=null;
      }
    else if(doc=='doc4'){
      this.doc4=null;

    }
    
  }

  createOTP() {
    if (this.createDealerForm.status == 'VALID') {
      if ((this.doc1==null || this.doc2==null) || (this.doc3=null || this.doc4==null)) {
        this.toaster.error('Please upload 2 files for both')
        //alert('')
      } else {
        this.formValid = false;
        this.dealerManagentService.createDealerOTP(this.createDealerForm.getRawValue().firmDetails.mobileNumber).subscribe(res => {
          if (res && res.Status == "200") {
            this.otpAuthMessage = res.Message;
            this.showOTPAuthPopup = true;
          } else {
            this.toaster.error(res.Message)
          }
        })
      }
    } else {
      this.formValid = true;
    }
  }

  verifyOTP() {
    if (this.otpInput) {
      this.isOtpValid = false;
      const otpObj = {
        "otp": this.otpInput,
        "phone_number": this.createDealerForm.getRawValue().firmDetails.mobileNumber
      }
      this.dealerManagentService.verifyDealerOTP(otpObj).subscribe(res => {
        if (res && res.Status == "200") {
          console.log('verify otp resp', res);
          this.showOTPAuthPopup = false;
          this.submit();
        } else {
          this.toaster.error(res.Message)
        }
      })
    }else{
      this.isOtpValid = true;
    }

  }

  closePopup() {
    this.router.navigateByUrl('/dashboard/dealer-management')
  }

  closeAuthPopup() {
    this.otpInput = '';
    this.showOTPAuthPopup = false;
  }
}
