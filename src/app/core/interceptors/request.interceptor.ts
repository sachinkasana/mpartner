import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import DeviceDetails from '../utils/device.util';
import {StorageService} from '../services/storage/storage.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService,private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.storage.getItem('token');
    const userId = this.storage.getItem('userId');
    const request_url = request.url.includes(environment.baseUrl);
    if(request.url.includes('ConsumerEmi')){
      return  next.handle(request).pipe(tap(x=> this.handleAuthError(x)));
    }
    //console.log('http intercept req url', request.url);
    if(request_url &&  token && userId){
      request = this.addRequestParams(request, token,userId);
    }
    return next.handle(request).pipe(tap(x=> this.handleAuthError(x)));
     // next.handle(request);
  }

  addRequestParams(request: HttpRequest<any>, token: string, userId: string) {
    if (request && request.method === 'GET') {
      let params = new HttpParams();
      params = params.append('token', token);
      params = params.append('user_id', userId);
      const cloneReq = request.clone({
        params: params,
      });

      return cloneReq;
    } else {
      return request;
    }
  }

  getRequestParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('app_version', DeviceDetails.getAppVersion());
    params = params.append(
      'appversion_code',
      DeviceDetails.getAppVersionCode()
    );
    params = params.append('device_id', DeviceDetails.getDeviceId());
    params = params.append('device_name', DeviceDetails.getDeviceName());
    params = params.append('os_type', DeviceDetails.getOSType());
    params = params.append('os_version_name', DeviceDetails.getOSVersionName());
    params = params.append('os_version_code', DeviceDetails.getOSVersionCode());
    params = params.append('ip_address', DeviceDetails.getIpAddress());
    params = params.append('screen_name', DeviceDetails.getScreenName());
    params = params.append('network_type', DeviceDetails.getNetworkType());
    params = params.append(
      'network_operator',
      DeviceDetails.getNetworkOperator()
    );
    params = params.append('time_captured', DeviceDetails.getTimeCaptured());
    params = params.append('channel', DeviceDetails.getChannel());

    return params;
  }

  private handleAuthError(err: any): Observable<any> {
    //handle your auth error or rethrow
    if (err.body.Status == 401 || err.body.Status == 403) {
        //navigate /delete cookies or whatever
        localStorage.clear();
        this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(() => new Error('User is not authorized'));
}
}
