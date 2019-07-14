import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  password: string;
  repassword: string;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register Page');
  }

  register() {
      console.log("Username: " + this.username);
      alert('Welcome to Kai King ' + this.username + '!')

      // alert('Test');
      if (this.username.length === 0 || this.password.length === 0 || this.repassword.length === 0) {
        alert('Please fill in all fields');
      } else {
          console.log("Username: " + this.username);
          console.log("Password: " + this.password);
      }

  }

}
