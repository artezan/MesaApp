import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PlanoPage } from '../pages/plano/plano';
import { EditarmesaPage } from '../pages/editarmesa/editarmesa';
import { CapturarPage } from '../pages/capturar/capturar';
import { HttpModule, JsonpModule, Jsonp, Response } from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Provider } from '../providers/provider/provider';
import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { FirebaseProvider } from '../providers/firebase/firebase';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
 const config = {
    apiKey: "AIzaSyCoOBmg0Vbpyqb30JIW95KmEX4_oE_oUGg",
    authDomain: "ionic-186307.firebaseapp.com",
    databaseURL: "https://ionic-186307.firebaseio.com",
    projectId: "ionic-186307",
    storageBucket: "ionic-186307.appspot.com",
    messagingSenderId: "787179626825"
  };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
     PlanoPage,
    EditarmesaPage,
    CapturarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
IonicStorageModule.forRoot(),
 HttpModule,
 AngularFireDatabaseModule,
 AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
     PlanoPage,
    EditarmesaPage,
    CapturarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Provider,Clipboard,BackgroundMode,
    FirebaseProvider
  ]
})
export class AppModule {}
