import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../../utils/device.util';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EPointsService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  private BASE_URL = environment.baseUrl;
  private LUMINOUS_BASE_URL = environment.luminousBaseUrl;

  getPartnerPoints(): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/GetPinelab_PartnerPoints?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getPineLabPoints():Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/Pinelab_getPoints_new_trip?&balance_value=100&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getAllocatedPoints(): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/getAllocatePointByMode?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  verifyPaytmNumber(input:any): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const deviceObj = DeviceDetails.getLMSDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    return this.httpClient.post(this.BASE_URL + '/verifyPaytmMobileNo', bodyObj)
  }

  getPaytmOTP(userId:string, mobile:string,txnId:string): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/CreateOtp_Paytm?type=new&mode=PayTm&transactionid=${txnId}&loginUserId=${userId}&phone_number=${mobile}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}`
    ); 
  }

  validatePaytmOTP(otp:string): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/OTPAuthentication_paytm?otp=${otp}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionCode()}`
    ); 
  }

  verifyPaytmMobileOTP(input:any): Observable<any>{
    const deviceObj = DeviceDetails.getLMSDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    return this.httpClient.post(this.BASE_URL + '/verifyPaytmMobileOTP', bodyObj)
  }

  getTransferModeList():Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/getModeList?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  saveTranferPoints(input:any): Observable<any>{
    const deviceObj = DeviceDetails.getLMSDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    return this.httpClient.post(this.BASE_URL + '/transferPoint', bodyObj)
  }
  
}
