import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UserInfo, LoginService } from './../services/login-service.service';
import {register} from 'ts-node';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

    repassword: string;
    newUser: UserInfo = {
        username: '',
        password: ''
    };

    userID = null;


  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private loadingController: LoadingController,
              private loginService: LoginService,
              private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register Page');
  }

   async register() {
       if (this.passesInputChecks()) {
           this.addToDatabase();
       } else {
           this.displayAlert();
       }
  }

  passesInputChecks() {
      return this.inputFieldsFilled() && this.passwordsMatch();
  }

  inputFieldsFilled() {
      return (this.newUser.username && this.newUser.password && this.repassword);
  }

  passwordsMatch() {
      return (this.newUser.password === this.repassword);
  }

  displayAlert() {
      if ( !this.inputFieldsFilled()) { alert('Please fill in all fields'); }
      else if ( !this.passwordsMatch()) { alert('Passwords do not match'); }
  }

  async addToDatabase() {
      const popUpMessage = await this.loadingController.create({
          message: 'Welcoming you to the whanau'
      });
      await popUpMessage.present();

      if (!this.userID) {
          this.addNewUser(popUpMessage);
      } else {
          this.updateCurrentUser(popUpMessage);
      }
  }

  async addNewUser(message) {
      // this.loginService.addUser(this.newUser).then(() => {
      try {
          const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.newUser.username, this.newUser.password);
          console.log(this.newUser.username, this.newUser.password);
          message.dismiss();
          this.nav.navigateBack('tabs/tab1');
      } catch (e) {
          message.dismiss();
          alert(e);
      }
  }


  updateCurrentUser(message) {
      this.loginService.updateUser(this.newUser, this.userID).then(() => {
          message.dismiss();
          this.nav.navigateBack('tabs/tab1');
      });
  }


}
