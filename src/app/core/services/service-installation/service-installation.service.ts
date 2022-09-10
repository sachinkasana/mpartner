import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../../utils/device.util';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  private BASE_URL = environment.baseUrl;
  private LUMINOUS_BASE_URL = environment.luminousBaseUrl;
  private Model_Name='';
  private Product_Type='';

  setModelName(data:string){
    this.Model_Name=data;
  }

  setProductType(data:string){
    this.Product_Type=data;
  }

  getModelName(){
    return this.Model_Name;
  }
  
  getProductType(){
    return this.Product_Type;
  }

  getServiceRequest(): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/getServiceInstallationLabels?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getTypesOfService(): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/getServiceTypes?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getStatusList(): Observable<any> {
    const userType = this.storageService.getItem('userType') || 'DEALER';
    return this.httpClient.get(
      `${this.BASE_URL}/getCheckStatusList?type=${userType}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  getUploadedImageList(): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/getServiceUploadedImageList_New?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&Page_Staus=IN`
    ); 
  }

  uploadImage(data:any): Observable<any>{
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token=token;
    data.user_id=userId;
    const bodyObj = {...deviceObj, ...data};
    console.log(bodyObj);
    return this.httpClient.post(this.BASE_URL + '/serviceRequestImage', bodyObj)
  }

  deleteImage(data:any): Observable<any>{
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const token = this.storageService.getItem('token');
    const userId = this.storageService.getItem('userId');
    data.token=token;
    data.user_id=userId;
    const bodyObj = {...deviceObj, ...data};
    console.log(bodyObj);
    return this.httpClient.post(this.BASE_URL + '/deleteServiceImage', bodyObj)
  }
  convertDateFormat(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  submitRequest(input:any): Observable<any>{
    input.salesDate=this.convertDateFormat(input.salesDate)
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    console.log(bodyObj);
    return this.httpClient.post(this.BASE_URL + '/serviceRequest', bodyObj)
  }

  verifyStatus(input:any): Observable<any>{
    const deviceObj = DeviceDetails.getDeviceDetailObject();
    const bodyObj = {...deviceObj, ...input};
    console.log(bodyObj);
    return this.httpClient.post(this.BASE_URL + '/verifyStatusNew', bodyObj)
  }

  scanSerialNumber(serialNo:string): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/get_SerWRS_Primary_Sec_Ter_Detail_V2?serialNo=${serialNo}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}`
    ); 
  }

  checkSerialNumberStatus(serialNo:string): Observable<any> {
    const distId = this.storageService.getItem('userId');
    return this.httpClient.get(
      `${this.LUMINOUS_BASE_URL}/SerWRS_Primary_Sec_Ter_Detail_V2?DisCode=${distId}&serialNo=${serialNo}&token=pass@1234`
    ); 
  }

}
