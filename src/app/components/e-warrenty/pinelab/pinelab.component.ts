import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pinelab',
  templateUrl: './pinelab.component.html',
  styleUrls: ['./pinelab.component.css'],
})
export class PinelabComponent implements OnInit {
  constructor(private storageService: StorageService, private domSanitize: DomSanitizer) {}

  pinelabUrl: any;
  ngOnInit(): void {
    const userId = this.storageService.getItem('userId');
    this.pinelabUrl =this.domSanitize.bypassSecurityTrustResourceUrl(`${environment.pineLabUrl}?email=${userId}&token=8B607F1775CF4401BE84`);
  }
}
