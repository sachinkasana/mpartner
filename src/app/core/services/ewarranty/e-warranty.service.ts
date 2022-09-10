import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../../utils/device.util';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EWarrantyService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  private BASE_URL = environment.baseUrl;
  private LUMINOUS_BASE_URL = environment.luminousBaseUrl;

  getAcceptanceRejectionPercentage(): Observable<any>{
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/StrSerWRReportConnect_Rejection_per?dist_code=9999995&Scheme=connect%20plus%202&user_type=Distributor&token=pass@1234`);
  }

  getReports(): Observable<any>{
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/SerWRReportConnect_CardV2?dist_code=9999995&Scheme=connect%20plus%202&user_type=Distributor&token=pass@1234`);
  }

  getPageCards():Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/ewarranty_page_cards?&plus_flag=1&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }
  
  getTermsAndConditions():Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/GetTerms_Conditions?&plus_flag=1&pagename=EWarranty&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getSaleDate():Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/Ewarranty_SaleDate?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  validatePartnerStatus(input:any): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    return this.httpClient.post(this.BASE_URL + '/validatePartnerStatus', bodyObj)
  }

  getScanOption():Observable<any>{
    return this.httpClient.get(
      `${this.BASE_URL}/getScanOption?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  updateScannedSerialNos(sr_no:string, mobile: string, saleDate: string):Observable<any>{
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/mSerWRSrNoExistanceUpdateV4?sr_no=${sr_no}&mobileno=${mobile}&saledate=${saleDate}&token=pass@1234`);
  }

  createSerialOtp(sr_no:string, mobile: string, userid: string):Observable<any>{
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/EW_CreateOtp_V3?CustomerCode=${userid}&SerialNo=${sr_no}&MobileNo=${mobile}&imeinumber=a9c4c0ddaa92ca15&osversion=10&devicename=V2029&appversion=7.5&AppTypeName=PSB&token=pass@1234`);
  }

  verifySerialOtp(sr_no:string, mobile: string, userid: string, otp: string,TransID?:string):Observable<any>{
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/EW_VarifyOtpV3?CustomerCode=${userid}&SerialNo=${sr_no}&MobileNo=${mobile}&imeinumber=a9c4c0ddaa92ca15&osversion=10&devicename=V2029&appversion=7.5&AppTypeName=PSB&token=pass@1234&otp=${otp}&TransID=${TransID}`);
  }

  saveWarrantyWithOTP(input:any): Observable<any>{
    const headers = { 'content-type': 'application/json'};
   
    return this.httpClient.post(this.LUMINOUS_BASE_URL + '/WebService_EW_SaveWithOTP_WarrantyV3_Trip', input)
  }

  getStateList():Observable<any>{
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/sapStateList?&token=pass@1234`);
  }

  getCityList(stateId: string):Observable<any>{
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/sapCityList?stateID=${stateId}&token=pass@1234`);
  }
  
  saveCustomerEntrySchemeWithoutOTP(input:any): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    //const deviceObj = DeviceDetails.getDeviceDetailObject();
    const bodyObj = {...input};
    return this.httpClient.post(this.LUMINOUS_BASE_URL + '/EW_mSerWRSaveEntryUpdatedSchemeImgpathV3', bodyObj)
  }

  getDealerList():Observable<any>{
    return this.httpClient.get('../../../../assets/mock-dealer-options.json');
  }

  getReportCard():Observable<any>{
    const userId = this.storageService.getItem('userId');
    return this.httpClient.get(`${this.LUMINOUS_BASE_URL}/mSerConnect_RptCardDetail?dis_dlr_code=${userId}&Scheme=connect%20plus%203&user_type=Distributor&serial_number=0&token=pass@1234`);
  }
}
