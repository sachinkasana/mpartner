import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../../utils/device.util';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  private BASE_URL = environment.baseUrl;

  getUpperSideMenu(): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/Menu_side_upper_botton?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getFCMToken()}`
    ); 
  }

  getHomePageCards(): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/home_page_cards?type=child&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getFCMToken()}`
    ); 
  }

  getEwarrantyPointReductionAgreement(): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/getEwarrantyPointReductionAgreementUrl?type=child&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getAlertnotification(): Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/GetAlertnotification?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  saveEwarrantyPointReductionAgreement(data: any): Observable<any>{
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token = token;
    data.user_id = userId;
    const bodyObj = { ...deviceObj, ...data };
    return this.httpClient.post(
      `${this.BASE_URL}/Save_point_reduction_Agreement`,
      bodyObj
    );
  }

  getLssWeek(): Observable<any>{
    let data:any ={};
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token = token;
    data.user_id = userId;
    const bodyObj = { ...deviceObj, ...data };
    return this.httpClient.post(
      `${this.BASE_URL}/Lss_Week`,
      bodyObj
    );
  }

}
