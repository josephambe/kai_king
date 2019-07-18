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

  async login() {
    console.log("Username: " + this.currentUser.username);
    console.log("Password: " + this.currentUser.password);
    try {
        await this.afAuth.auth.signInWithEmailAndPassword(this.currentUser.username, this.currentUser.password);
    } catch (e) {
        alert(e);
    }

  }

  register() {
    this.navCtrl.navigateForward('/register');
  }

    resetPassword() {
        this.navCtrl.navigateForward('/reset-password');
    }


      // if (email) {
      //     return this.afAuth.auth.sendPasswordResetEmail(email);
      // } else {
      //     alert('Please enter your username');
      // }


}
