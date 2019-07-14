import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  username: string;
  password: string;
  constructor(public navCtrl: NavController) {}

  login() {
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);

  }

  goRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
