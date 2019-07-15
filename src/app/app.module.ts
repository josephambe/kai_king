import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBJnW3A6yH7Snu9kZUf43pc5fXTojwr9gs',
    authDomain: 'myapp-57976.firebaseapp.com',
    databaseURL: 'https://myapp-57976.firebaseio.com',
    projectId: 'myapp-57976',
    storageBucket: '',
    messagingSenderId: '382290315048',
    appId: '1:382290315048:web:fa5032a242eaf2a5'
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule,
      AngularFireDatabaseModule, AngularFireModule,
  AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
