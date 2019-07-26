import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        firebase.initializeApp(environment);
        SplashScreen.hide().catch(error => {
            console.error(error);
        });

        // StatusBar.hide().catch(error => {
        //     console.error(error);
        // });
    }
}
