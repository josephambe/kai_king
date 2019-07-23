import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import {UserInfo} from '../../services/login-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import Timeout from 'await-timeout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

    currentUser: UserInfo = {
        username: '',
        password: ''
    };
  constructor(public navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private loadingController: LoadingController,
              public router: Router) {}

  async login() {
    console.log('Username: ' + this.currentUser.username);
    console.log('Password: ' + this.currentUser.password);
    try {
        await this.afAuth.auth.signInWithEmailAndPassword(this.currentUser.username, this.currentUser.password);
        this.welcomeMessage();
        this.router.navigate(['/tabs']);
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

    async welcomeMessage() {
        const popUpMessage = await this.loadingController.create({
            message: 'Welcome to Kai King!'
        });
        await popUpMessage.present();
        await Timeout.set(3000);
        popUpMessage.dismiss();
    }

}
