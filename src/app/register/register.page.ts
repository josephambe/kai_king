import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: '';
  password: '';
  repassword: '';
  items;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
      this.getDataFromFirebase();
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register Page');
  }

  register() {
      console.log("Username: " + this.username);
      console.log("Password: " + this.password);
      console.log("Repassword: " + this.repassword);


      if (this.username && this.password && this.repassword) {
          console.log("Username: " + this.username);
          alert('Welcome to Kai King ' + this.username + '!');
      } else {
          alert('Please fill in all fields');

      }

  }

  getDataFromFirebase() {
      this.afd.list('/users').valueChanges().subscribe(
          data => {
              console.log(JSON.stringify(data));
              this.items = data;
          }
      );

  }

}
