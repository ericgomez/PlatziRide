import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RideService } from '../services/ride';
import { AuthenticationService } from '../services/authentication';
import { TokenInterceptorService } from 'src/services/tokenInterceptor';
import { WeatherService } from 'src/services/weather';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, RideService, AuthenticationService, 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}, //Le inidicamos a ionic que utilize el interceptor TokenInterceptorService
    WeatherService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
