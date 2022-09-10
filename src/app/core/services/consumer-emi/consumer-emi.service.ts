import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../../utils/device.util';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerEmiService {
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  private BASE_URL = environment.baseUrl;
  

  createConsumerOTP(userId:string,mobile:string): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/CreateOtp_ConsumerEmi?loginUserId=${userId}&phone_number=${mobile}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}`
    ); 
  }

  getConsumerOTPAuthentication(userId:string,otp:string): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/OTPAuthentication_ConsumerEmi?user_id=${userId}&otp=${otp}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}`
    ); 
  }

  getRoSmDetails(input:any): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    //const body=JSON.stringify(bodyObj);
    console.log(bodyObj);
    return this.httpClient.post(this.BASE_URL + '/consumerEMI_Get_Ro_Sm_Details', bodyObj)
  }

}
