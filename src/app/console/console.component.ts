import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, interval } from 'rxjs'
import { ApiService } from '../api.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit, OnDestroy {
  private zegar$: Subscription;
  processingSubmit: boolean = false;
  urlCtrl = new FormControl();
  outputCtrl = new FormControl();
  payloadCtrl = new FormControl();
  rawOutputCtrl = new FormControl();
  myForm = new FormGroup({
    url: this.urlCtrl,
    output: this.outputCtrl,
    payload: this.payloadCtrl,
    rawoutput: this.rawOutputCtrl
  });

  setURL(link : string){
    this.urlCtrl.setValue(link);
  }
  
  responses: any[] = [];
  /*
    {"error":{"code":"100003","message":""},"topic":"error","url":"/api/costam1","date":Date.now()},
    {"error":{"code":"120003","message":""},"topic":"error","url":"/api/costam1","date":Date.now()},
    {"response":{"CurrentConnectTime":"355624","CurrentUpload":"1833443384","CurrentDownload":"28401873133","CurrentDownloadRate":"953899","CurrentUploadRate":"8781","TotalUpload":"460716027209","TotalDownload":"6320507273900","TotalConnectTime":"47300354","showtraffic":"1"},"topic":"response","url":"/api/costam1","date":Date.now()},
  ]*/

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  constructor(private apiService: ApiService) {
  }

  doGet() {
    this.processingSubmit = true;
    console.log("doGet" + this.myForm.value.url);
    var myUrl = this.myForm.value.url;
    this.apiService.getApiByUrl(this.myForm.value.url).subscribe(dane => {
      this.myForm.patchValue({rawoutput: JSON.stringify(dane) + "\n" + this.myForm.value.rawoutput});
      dane['topic']=Object.keys(dane)[0];
      dane['url']=myUrl;
      dane['date']=Date.now();
      console.log(dane);

      this.responses.unshift(dane);
      //      this.myTraffic = dane['response'];
      this.processingSubmit=false;
    });
  }

  doDel(){}

  doPut(){}

  doPost(){}

  doDeleteLog(resp){
    let index = this.responses.indexOf(resp);
    this.responses.splice(index, 1);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  urls = [
    '/api/cradle/basic',
    '/api/cradle/current',
    '/api/cradle/factory',
    '/api/cradle/mac',
    '/api/cradle/status',
    '/api/ddns/ddns',
    '/api/device/autorun',
    '/api/device/basic',
    '/api/device/compresslogfile',
    '/api/device/control',
    '/api/device/fastbootswitch',
    '/api/device/information',
    '/api/device/logsetting',
    '/api/device/mode',
    '/api/device/powersaveswitch',
    '/api/device/signal',
    '/api/device/usb',
    '/api/dhcp/settings',
    '/api/diagnosis/ping',
    '/api/diagnosis/traceroute',
    '/api/diagnosis/tracerouteresult',
    '/api/dialup/auto',
    '/api/dialup/connection',
    '/api/dialup/dial',
    '/api/dialup/dialup',
    '/api/dialup/mobile',
    '/api/dialup/profiles',
    '/api/filemanager/upload',
    '/api/global/module',
    '/api/host/info',
    '/api/language/current',
    '/api/monitoring/check',
    '/api/monitoring/clear',
    '/api/monitoring/converged',
    '/api/monitoring/month',
    '/api/monitoring/start',
    '/api/monitoring/status',
    '/api/monitoring/traffic',
    '/api/monitoring/traffic-statistics',
    '/api/net/current',
    '/api/net/net',
    '/api/net/network',
    '/api/net/plmn',
    '/api/net/register',
    '/api/net/signal',
    '/api/online',
    '/api/ota/activate',
    '/api/ota/otamsg',
    '/api/ota/otksl',
    '/api/pb/group',
    '/api/pb/pb',
    '/api/pin/operate',
    '/api/pin/save',
    '/api/pin/simlock',
    '/api/pin/status',
    '/api/pin/verify',
    '/api/redirection/homepage',
    '/api/sdcard/',
    '/api/sdcard/createdir',
    '/api/sdcard/deletefile',
    '/api/sdcard/dlna',
    '/api/sdcard/fileupload',
    '/api/sdcard/getpath',
    '/api/sdcard/printerlist',
    '/api/sdcard/sdcapacity',
    '/api/sdcard/sdcard',
    '/api/sdcard/sdcardsamba',
    '/api/sdcard/sdfile',
    '/api/sdcard/sdfilestate',
    '/api/sdcard/share',
    '/api/sdcard/uploadflag',
    '/api/security/bridgemode',
    '/api/security/dmz',
    '/api/security/firewall',
    '/api/security/lan',
    '/api/security/mac',
    '/api/security/nat',
    '/api/security/sip',
    '/api/security/special',
    '/api/security/upnp',
    '/api/security/url',
    '/api/security/virtual',
    '/api/sms/backup',
    '/api/sms/cancel',
    '/api/sms/config',
    '/api/sms/delete',
    '/api/sms/get',
    '/api/sms/operate',
    '/api/sms/save',
    '/api/sms/send',
    '/api/sms/set',
    '/api/sms/sms',
    '/api/sms/splitinfo',
    '/api/sntp/sntpswitch',
    '/api/stk/stk',
    '/api/user/logout',
    '/api/user/password',
    '/api/user/remind',
    '/api/user/session',
    '/api/user/state',
    '/api/ussd/get',
    '/api/ussd/release',
    '/api/ussd/send',
    '/api/ussd/status',
    '/api/voice/addsipaccount',
    '/api/voice/codec',
    '/api/voice/deletesipaccount',
    '/api/voice/sipaccount',
    '/api/voice/sipadvance',
    '/api/voice/sipserver',
    '/api/voice/speeddial',
    '/api/voice/voiceadvance',
    '/api/webserver/token',
    '/api/wlan/basic',
    '/api/wlan/handover',
    '/api/wlan/host',
    '/api/wlan/mac',
    '/api/wlan/multi',
    '/api/wlan/oled',
    '/api/wlan/security',
    '/api/wlan/sta',
    '/api/wlan/station',
    '/api/wlan/wifi',
    '/api/wlan/wifiaddprofile',
    '/api/wlan/wifidial',
    '/api/wlan/wifiprofile',
    '/api/wlan/wifiscan',
    '/api/wlan/wifiscanresult',
    '/api/wlan/wps'
  ];
}
