import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UserInfo, LoginService } from './../services/login-service.service';
import {register} from 'ts-node';
import {AngularFireAuth} from '@angular/fire/auth';
import Timeout from 'await-timeout';

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
           this.addNewUser();
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

    async addNewUser() {
        try {
            await this.afAuth.auth.createUserWithEmailAndPassword(this.newUser.username, this.newUser.password);
            this.welcomeUser();
        } catch (e) {
            alert(e);
        }

    }

  async welcomeUser() {
      const popUpMessage = await this.loadingController.create({
          message: 'Welcoming you to the whanau'
      });
      await popUpMessage.present();
      await Timeout.set(3000);
      popUpMessage.dismiss();
      this.nav.navigateBack('tabs/tab1');
  }

    // this.loginService.addUser(this.newUser).then(() => {
    // updateCurrentUser() {
  //     this.loginService.updateUser(this.newUser, this.userID).then(() => {
  //         // message.dismiss();
  //         this.nav.navigateBack('tabs/tab1');
  //     });
  // }


}
