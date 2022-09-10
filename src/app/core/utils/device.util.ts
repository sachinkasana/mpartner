 class DeviceDetails {
  constructor() {}

  getAppVersion(): string {
    return 'app_version=8.0';
  }

  getAppVersionCode(): string {
    return 'appversion_code=67';
  }

  getDeviceId(): string {
    return 'device_id=358240051111110';
  }

  getDeviceName(): string {
    return 'device_name=vivo 1812';
  }

  getOSType(): string {
    return 'os_type=Android';
  }

  getOSVersionName(): string {
    return 'os_version_name=27';
  }

  getOSVersionCode(): string {
    return 'os_version_code=8.1.0';
  }

  getIpAddress(): string {
    return 'ip_address=0.0.0.0';
  }

  getScreenName(): string {
    return 'screen_name=HomePageFragment';
  }

  getNetworkType(): string {
    return `network_type=4g`;
  }

  getNetworkOperator(): string {
    return 'network_operator=Airtel';
  }

  getTimeCaptured(): string {
    return `time_captured=${Date.now().toString()}`;
  }

  getChannel(): string {
    return 'channel=M';
  }

  getLanguage(): string{
    const lang=localStorage.getItem('selectedLang') || 'EN';
    return `language=${lang.toUpperCase() || 'EN'}`;
  }

  getFCMToken():string{
    return 'fcm_token=ytrru7uytuyt';
  }

  getDeviceDetailObject(){
    const lang=localStorage.getItem('selectedLang') || 'EN';
    return{
      'app_version':'8.0',
      'device_id':'358240051111110',
      'device_name':'vivo 1812',
      'os_type':'Android',
      'os_version_name':'27',
      'os_version_code':'8.1.0',
      'ip_address':'0.0.0.0',
      'screen_name':'HomePageFragment',
      'network_type':'4g',
      'network_operator':'Airtel',
      'channel':'M',
      'language':lang.toUpperCase() || 'EN',
      'time_captured':Date.now().toString()
    }
  }

  getLMSDeviceDetailObject(){
    return{
      'app_version':'8.0',
      'appversion_code':'67',
      'device_id':'358240051111110',
      'device_name':'vivo 1812',
      'Os_type':'Android',
      'Os_version_name':'27',
      'Os_version_code':'8.1.0',
      'ip_address':'0.0.0.0',
      'screen_name':'HomePageFragment',
      'network_type':'4g',
      'Network_operator':'Airtel',
      'channel':'M',
      'language':'EN',
      'time_captured':Date.now().toString()
    }
  }
}

export default new DeviceDetails();