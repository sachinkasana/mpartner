import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-update-documents',
  templateUrl: './update-documents.component.html',
  styleUrls: ['./update-documents.component.css']
})
export class UpdateDocumentsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfileData();
  }

  getUserProfileData(){
    this.userService.getUserProfile().subscribe(data=>{
      console.log('profile', data);
    })
  }

}
