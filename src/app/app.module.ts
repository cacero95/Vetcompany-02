import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MascotaPage } from './pages/mascota/mascota.page';

// servicios
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {HttpClientModule} from '@angular/common/http';

// social netwroks

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ViewFullPage } from './pages/view-full/view-full.page';
import { UserTypePage } from './pages/user-type/user-type.page';
import { RegistrarVetPage } from './pages/registrar-vet/registrar-vet.page';
import { ServiceManagePage } from './pages/service-manage/service-manage.page';
import { UserManagePage } from './pages/user-manage/user-manage.page';




export const firebaseConfig = {
  apiKey: "AIzaSyBVY89FFlPr00IH6TuWsszn0CgpFn0ZkA0",
  authDomain: "gag-6f2a5.firebaseapp.com",
  databaseURL: "https://gag-6f2a5.firebaseio.com",
  projectId: "gag-6f2a5",
  storageBucket: "gag-6f2a5.appspot.com",
  messagingSenderId: "645855939410"
};

@NgModule({
  declarations: [AppComponent,MascotaPage,ViewFullPage,UserTypePage,RegistrarVetPage,ServiceManagePage,UserManagePage],
  entryComponents: [MascotaPage,ViewFullPage,UserTypePage,RegistrarVetPage,ServiceManagePage,UserManagePage],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
