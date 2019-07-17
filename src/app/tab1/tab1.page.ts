import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import {UserInfo} from '../services/login-service.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    currentUser: UserInfo = {
        username: '',
        password: ''
    };
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {}

  login() {
    console.log("Username: " + this.currentUser.username);
    console.log("Password: " + this.currentUser.password);
    //this.afAuth.auth.

  }

  goRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
