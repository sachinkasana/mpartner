import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUsInfo:any;
  private imageSrc: string = '';
  message:any;
  fileName='';
  fileLabel='Attach Image'
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getContactUSDetails();
    this.getUserDetails()
  }
  

  getContactUSDetails(){
    this.userService.getContactUS().subscribe((res) => {
      if (res && res.Status === '200') {
        console.log('res',res)
        this.contactUsInfo=res.contactus;
      } else {
        alert(res.Message);
      }
    });
  }

  handleInputChange(e:any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.fileName=file.name
    this.fileLabel=this.fileName;
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
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }

  sendContactUsQuery(){
    let data={
      "user_id":"",
      "name":"",
      "email":"",
      "message":"Hello",
      "contactusimage":"",
      "filename":""
    };
    data.filename=this.fileName;
    data.name=localStorage.getItem('name') || '';
    data.email=localStorage.getItem('email') || '';
    data.message=this.message || '';
    data.contactusimage=this.imageSrc
    this.userService.sendContactQuery(data).subscribe((res) => {
      if (res && res.Status === '200') {
        console.log('res',res)
       alert(res.Message);
       window.location.reload();
      } else {
        alert(res.Message);
      }
    });
  }

  getUserDetails(){
    this.userService.getProfileData().subscribe((res) => {
      if (res && res[0]) {
        const profile=res[0];
        localStorage.setItem('email',profile.Email);
        localStorage.setItem('name',profile.Name);
        localStorage.setItem('phone',profile.Phone);
        
      } else {
        alert(res.Message);
      }
    });
    
  }

}
