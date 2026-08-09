import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../api.service';
import { LoglineComponent } from '../logline/logline.component';

@Component({
  selector: 'app-console',
  imports: [ReactiveFormsModule, LoglineComponent],
  templateUrl: './console.component.html',
  styleUrl: './console.component.css'
})
export class ConsoleComponent {

  private apiService = inject(ApiService);

  readonly processingSubmit = signal(false);
  readonly responses = signal<any[]>([]);

  /** Index of the visible tab: 0 = Output, 1 = Payload, 2 = Raw output. */
  readonly activeTab = signal(0);

  urlCtrl = new FormControl('');
  outputCtrl = new FormControl('');
  payloadCtrl = new FormControl('');
  rawOutputCtrl = new FormControl('');
  myForm = new FormGroup({
    url: this.urlCtrl,
    output: this.outputCtrl,
    payload: this.payloadCtrl,
    rawoutput: this.rawOutputCtrl
  });

  setURL(link: string) {
    this.urlCtrl.setValue(link);
  }

  selectTab(tab_id: number) {
    this.activeTab.set(tab_id);
  }

  doGet() {
    this.processingSubmit.set(true);
    const myUrl = this.myForm.value.url ?? '';
    this.apiService.getApiByUrl(myUrl).subscribe(dane => {
      this.myForm.patchValue({
        rawoutput: JSON.stringify(dane) + '\n' + (this.myForm.value.rawoutput ?? '')
      });
      dane['topic'] = Object.keys(dane)[0];
      dane['url'] = myUrl;
      dane['date'] = Date.now();

      this.responses.update(list => [dane, ...list]);
      this.processingSubmit.set(false);
    });
  }

  doDel() {
    // placeholder: the DELETE button is disabled until the backend supports it
  }

  doPut() {
    // placeholder: the PUT button is disabled until the backend supports it
  }

  doPost() {
    // placeholder: the POST button is disabled until the backend supports it
  }

  doDeleteLog(resp: any) {
    this.responses.update(list => list.filter(item => item !== resp));
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
