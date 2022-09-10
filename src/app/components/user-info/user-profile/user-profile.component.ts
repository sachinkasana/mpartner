import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';
import Utils from 'src/app/core/utils/helper.util'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private router:Router, private userService: UserService,private toastr: ToastrService) { }

  userData:any;
  profileImg:string;
  selectedFileType='';
  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){
    this.userService.getUserProfile().subscribe((data:any)=>{
      console.log('user profile', data);
      if(data && data.Status === '200'){
        this.userData = data;
      }else{
        this.toastr.error(data.Message)
        console.log('User profile api error', data.Message);
        
      }
    })
  }

  gotoDevice(device:string,id:number){
    this.router.navigate(['dashboard/user-info/device'],{queryParams: { 'id':id,'device':device}});
  }

  
  handleInputChange(e:any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
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
  _handleReaderLoaded(e:any) {
    let reader = e.target;
    this.profileImg = reader.result;

    this.profileImg = Utils.removeBase64(this.profileImg,this.selectedFileType);
    console.log(this.profileImg);
    this.saveUserProfile();
  }

  saveUserProfile(){
    const {BusinessName,Anniversary,Birthday,secondaryDevice1,secondaryDevice2,profileImg} = this.userData;

    let obj = {
      "BusinessName":BusinessName,
      "anniversaryDate":Anniversary,
      "dob":Birthday,
      "profileImg":this.profileImg,
      "secondaryDevice1":"",
      "secondaryDevice2":""
    }
    
      
     this.userService.updateUserProfile(obj).subscribe((user:any)=>{
       if(user.Status == '200'){
         this.toastr.success(user.Message)
         this.getUserProfile();
       }else{
         alert(user.Message);
       }
     })
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
