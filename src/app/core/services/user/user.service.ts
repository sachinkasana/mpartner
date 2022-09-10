import { Injectable } from '@angular/core';
import { HttpClient, HttpContext,HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../../utils/device.util';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private httpBackendHandler: HttpBackend
  ) {}
  private BASE_URL = environment.baseUrl;
  private LUMINOUS_BASE_URL = environment.luminousBaseUrl;
  private REPORT_URL = environment.reportUrl;
  private SOLAR_URL = environment.solarCalculatorUrl;

  getSchemePageCards(selectedUserType: string): Observable<any> {
    const userType =
      selectedUserType || this.storageService.getItem('userType') || 'DEALER';
    //const userType = 'DEALER';

    return this.httpClient.get(
      `${
        this.BASE_URL
      }/scheme_page_cards?customertype=${userType}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  getPriceListPageCards(selectedUserType: string): Observable<any> {
    // const userType = this.storageService.getItem('userType') || 'DEALER';
    const userType =
      selectedUserType || this.storageService.getItem('userType') || 'DEALER';

    return this.httpClient.get(
      `${
        this.BASE_URL
      }/pricelist_page_cards?parentid=1&customertype=${userType}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  getGalleryMainData(categoryId: string): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/Gallery_maindata?gallery_categoryid=${categoryId}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  getFAQ(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/Faq?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  getContactUS(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/Contactus_details?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  sendContactQuery(data: any): Observable<any> {
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token = token;
    data.user_id = userId;
    const bodyObj = { ...deviceObj, ...data };
    return this.httpClient.post(
      `${this.BASE_URL}/Save_contactus_suggestion`,
      bodyObj
    );
  }

  getProfileData(): Observable<any> {
    let userId = localStorage.getItem('userId') || '';
    userId = userId.replace(/['"]+/g, '');
    return this.httpClient.get(
      `${this.LUMINOUS_BASE_URL}/sscPartnerDetailst?SessionLoginDisID=${userId}&token=pass@1234`
    );
  }

  getUserProfile(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/GetProfile?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  updateUserProfile(data: any): Observable<any> {
    const deviceObj = DeviceDetails.getLMSDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token = token;
    data.user_id = userId;

    const bodyObj = { ...deviceObj, ...data };
    //console.log('updated user profile obj', bodyObj);
    
    return this.httpClient.post(`${this.BASE_URL}/UpdateProfile`, bodyObj);
  }

  deleteUserDevice(data: any): Observable<any> {
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token = token;
    data.user_id = userId;

    const bodyObj = { ...deviceObj, ...data };
    return this.httpClient.post(`${this.BASE_URL}/deleteDevice`, bodyObj);
  }

  getWRSCalendar(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/get_wrs_MonthYear?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    );
  }

  getUserWRSData(data: any): Observable<any> {
    const deviceObj = DeviceDetails.getLMSDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token = token;
    data.user_id = userId;

    const bodyObj = { ...deviceObj, ...data };
    return this.httpClient.post(`${this.BASE_URL}/get_wrs_filter_report`, bodyObj);
  }
  
  getUserReport(reportType:string, fromDate: string, toDate:string): Observable<any> {
    let userId = localStorage.getItem('userId') || '';
    userId = userId.replace(/['"]+/g, '');
    return this.httpClient.get(
      `${this.REPORT_URL}/${reportType}?Discode=${userId}&FROMDATE=${fromDate}&TODATE=${toDate}&token=pass@1234&way=w`
    );
  }

  getServiceEscalation(stateId: string):Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/EscalationMatrix?stateid=${stateId}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getFCMToken()}`
    ); 
  }

  sendEmailReport(reportType:string, fromDate: string, toDate:string, emailId:string,customerCode:string,customerName:string,address:string,phoneNo:string, region:string  ):Observable<any>{
    let httpBackendClient = new HttpClient(this.httpBackendHandler)
    let userId = localStorage.getItem('userId') || '';
    userId = userId.replace(/['"]+/g, '');
    let token = localStorage.getItem('token') || '';
    token = token.replace(/['"]+/g, '');
    return httpBackendClient.get(
      `${this.BASE_URL}/${reportType}?token=pass@1234&way=w&fromdate=${fromDate}&todate=${toDate}&user_id=${userId}&token_m=${token}&Email=${emailId}&CustomerCode=${customerCode}&CustomerName=${customerName}&Address=${address}&Phoneno=${phoneNo}&Region=${region}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getBhmrCards(parentid:string):Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/BHMR_page_cards?parentid=${parentid}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getFCMToken()}`
    ); 
  }

  getBhmrCollectionCenterData(state:string, city: string): Observable<any> {
    return this.httpClient.get(
      `${this.LUMINOUS_BASE_URL}/webservice_bmhr_Address?state=${state}&city=${city}&token=pass@1234`
    );
  }

}
