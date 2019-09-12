import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigComponent }      from './config/config.component';
import { ConfigfComponent }      from './configf/configf.component';
import { ConfigrComponent }      from './configr/configr.component';

import { RouterComponent }      from './router/router.component';
import { ConsoleComponent }     from './console/console.component';
import { SignalComponent }      from './signal/signal.component';
import { AboutComponent }       from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/router', pathMatch: 'full' },
  { path: 'config', component: ConfigComponent },
  { path: 'configr', component: ConfigrComponent },
  { path: 'configf', component: ConfigfComponent },
  { path: 'router', component: RouterComponent },
  { path: 'signal', component: SignalComponent },
  { path: 'console', component: ConsoleComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}