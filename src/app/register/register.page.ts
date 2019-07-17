import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UserInfo, LoginService } from './../services/login-service.service';
import {register} from 'ts-node';

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
              private loginService: LoginService) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register Page');
  }

   async register() {
       if (this.inputFieldsFilled()) {
           this.addToDatabase();
       } else {
           alert('Please fill in all fields');
       }
  }

  inputFieldsFilled() {
      return (this.newUser.username && this.newUser.password && this.repassword);
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

  addNewUser(message) {
      this.loginService.addUser(this.newUser).then(() => {
          message.dismiss();
          this.nav.navigateBack('tabs/tab1');
      });
  }

  updateCurrentUser(message) {
      this.loginService.updateUser(this.newUser, this.userID).then(() => {
          message.dismiss();
          this.nav.navigateBack('tabs/tab1');
      });
  }


}
