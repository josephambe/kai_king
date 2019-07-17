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

  register() {
      console.log('Username: ' + this.newUser.username);
      console.log('Password: ' + this.newUser.password);
      console.log('Repassword: ' + this.repassword);


      if (this.newUser.username && this.newUser.password && this.repassword) {
          alert('Welcome to Kai King ' + this.newUser.username + '!');
      } else {
          alert('Please fill in all fields');
      }
  }

   async checkInput() {

       /**TO DO: Make sure duplicate emails and usernames aren't allowed**/
       if (this.newUser.username && this.newUser.password && this.repassword) {
           const loading = await this.loadingController.create({
               message: 'Welcoming you to the whanau'
           });
           await loading.present();

           if (!this.userID) {
               this.loginService.addUser(this.newUser).then(() => {
                   loading.dismiss();
                   this.nav.navigateBack('tabs/tab1');
               });
           } else {
               this.loginService.updateUser(this.newUser, this.userID).then(() => {
                   loading.dismiss();
                   this.nav.navigateBack('tabs/tab1');
               });
           }
       } else {
           alert('Please fill in all fields');
       }

  }

}
