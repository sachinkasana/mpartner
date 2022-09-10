import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import DeviceDetails from '../../utils/device.util';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class SolarService {
  constructor(private httpClient: HttpClient) {}

  private SOLAR_URL = environment.solarCalculatorUrl;
  private BASE_URL = environment.baseUrl;
  private data: any = undefined;

  setOnGridData(data: any) {
    this.data = data;
  }

  getOnGridData(): any {
    return this.data;
  }

  getSolarOnGridData(data: any): Observable<any> {
    return this.httpClient.post(`${this.SOLAR_URL}/calculate`, data);
  }

  getSolarOnGridPincodeData(pincode: string): Observable<any> {
    return this.httpClient.get(
      `${this.SOLAR_URL}/getLocalityMasterListByPinId?locality_pincode=${pincode}`
    );
  }

  getStateMaster(): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/GetStateMaster?${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getFCMToken()}`
    );
  }

  getCityMaster(stateId: string): Observable<any> {
    return this.httpClient.get(
      `${
        this.BASE_URL
      }/GetDistrictMaster?StateId=${stateId}&${DeviceDetails.getAppVersion()}&${DeviceDetails.getAppVersionCode()}&${DeviceDetails.getDeviceId()}&${DeviceDetails.getDeviceName()}&${DeviceDetails.getOSType()}&${DeviceDetails.getOSVersionName()}&${DeviceDetails.getOSVersionCode()}&${DeviceDetails.getIpAddress()}&${DeviceDetails.getScreenName()}&${DeviceDetails.getNetworkType()}&${DeviceDetails.getNetworkOperator()}&${DeviceDetails.getTimeCaptured()}&${DeviceDetails.getChannel()}&${DeviceDetails.getLanguage()}&${DeviceDetails.getFCMToken()}`
    );
  }
}
