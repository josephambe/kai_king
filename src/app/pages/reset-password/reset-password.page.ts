import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserInfo} from '../../services/login-service.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
    user: UserInfo = {
        username: '',
        password: ''
    };

  constructor(private afAuth: AngularFireAuth, private nav: NavController) { }

  ngOnInit() {
  }


  resetPassword(email: string) {

      this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
          // Email sent.
          alert('Kai King to the rescue! Check your inbox.');
      }).catch(error => {
          // An error happened.
          alert(error);
      });
    // if (email) {
    //     return this.afAuth.auth.sendPasswordResetEmail(email);
    // } else {
    //   alert('Please enter an email');
    // }
  }

}
