import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../utils/device.util';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private BASE_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getLanguages(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/getLanguage?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}`
    );
  }

  getUserData(mobile: string): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/GetUserData?phone_No=${mobile}&type=new&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  loginCreateOTP(mobile: string, userId: string): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/CreateOtp?loginUserId=${userId}&phone_number=${mobile}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionCode()}`
    );
  }

  otpAuthentication(userId: string, otp: string):Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/OTPAuthentication?user_id=${userId}&otp=${otp}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionCode()}`
    );
  }

  userVerification(userId:string, mobile: string):Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/Userverification_secondaryUser?&usertype=Parent&mobileNo=${mobile}&user_id=${userId}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getFCMToken()}`
    ); 
  }

  getAdImageList(langId:any): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/Custom_Image?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&languageid=${langId}`
    );
  }
}
