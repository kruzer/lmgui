import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }         from './app.component';
import { MessagesComponent }    from './messages/messages.component';

import { AppRoutingModule }     from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { ConfigComponent } from './config/config.component';
import { RouterComponent } from './router/router.component';
import { AboutComponent } from './about/about.component';
import { ConsoleComponent } from './console/console.component';
import { SignalComponent } from './signal/signal.component';
import { SecondsToTimePipe } from './seconds-to-time.pipe';
import { BytesSizePipe } from './bytes-size.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { ConfigfComponent } from './configf/configf.component';
import { ConfigrComponent } from './configr/configr.component';
import { LoglineComponent } from './logline/logline.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    ConfigComponent,
    RouterComponent,
    AboutComponent,
    ConsoleComponent,
    SignalComponent,
    SecondsToTimePipe,
    BytesSizePipe,
    ConfigfComponent,
    ConfigrComponent,
    LoglineComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
