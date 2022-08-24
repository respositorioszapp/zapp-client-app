import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CommoncomponentsModule } from './modules/commoncomponents/commoncomponents.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { DatePipe } from '@angular/common';
import { DateFormatHourPipe } from './pipes/date-format-hour.pipe';
import { AuthInterceptor } from './inteceptors/auth.interceptor';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat/';
import {AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //provideDatabase(() => getDatabase()),
    AngularFireDatabaseModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommoncomponentsModule,
    IonicModule.forRoot(),
    LottieModule.forRoot({ player: () => import("lottie-web") }),
    AppRoutingModule
  ],
  providers: [
    Deeplinks,
    StatusBar,
    SplashScreen,
    CallNumber,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    DatePipe,
    DateFormatHourPipe,
    Diagnostic,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AngularFireDatabase,
    AuthService,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
