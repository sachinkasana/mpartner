import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import DeviceDetails from 'src/app/core/utils/device.util';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DealerManagementService {
  private BASE_URL = environment.baseUrl;
  private LUMINOUS_BASE_URL = environment.luminousBaseUrl;
  private LMS_REPORT_URL = environment.reportUrl;
  constructor(private httpClient: HttpClient,private storageService: StorageService) {}

  getDocumentList(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/getDocList?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}`
    );
  }

  createDealerOTP(mobile:any): Observable<any>{
    let input = {
      'phone_number':mobile
    }
    const deviceObj = DeviceDetails.getLMSDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.BASE_URL + '/CreateOtp_Dealer', bodyObj)
  }

  verifyDealerOTP(input:any): Observable<any>{
    const deviceObj = DeviceDetails.getLMSDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.BASE_URL + '/OtpVerification_Dealer', bodyObj)
  }

  createUpdateDealer(input:any): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    let user_id=this.storageService.getItem('userId');
     let token= this.storageService.getItem('token');
     input.user_id=user_id;
     input.token=token;
     input.document1_img1=this.removeBase64String(input.document1_img1);
     input.document1_img2=this.removeBase64String(input.document1_img2);
     input.document2_img1=this.removeBase64String(input.document2_img1);
     input.document2_img2=this.removeBase64String(input.document2_img2);

    const bodyObj = {...deviceObj, ...input};
    return this.httpClient.post(this.BASE_URL + '/createDealer', bodyObj)
  }

  public removeBase64String(str:any){
    return str.split(',')[1]
  }

  getDealerList(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/getDealerList?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}`
    );
  }

  getDealerDetails(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/getDealerDetails?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}`
    );
  }

  getDealerStatus(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/getDealerStatus?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}`
    );
  }

  getDealerStatusList(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/getCheckDealerStatusList?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}`
    );
  }

  viewDealerList(userId:string, toDate:any): Observable<any> {
    return this.httpClient.get(
      `${
        this.LMS_REPORT_URL
      }/DEALER_LIST_REPORT?I_STAUTS=A&I_DATE_FROM=01/01/1900&I_DATE_TO=${toDate}&I_LOGIN_ID=${userId}&token=pass@1234&way=m`
    );
  }

  
}
