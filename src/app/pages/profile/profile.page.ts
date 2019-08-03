import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userProfile: any;
  public birthDate: Date;

  constructor(
      private alertCtrl: AlertController,
      private authService: AuthService,
      private profileService: ProfileService,
      private router: Router
  ) { }

  ngOnInit() {
      this.profileService
          .getUserProfile()
          .get()
          .then( userProfileSnapshot => {
              this.userProfile = userProfileSnapshot.data();
              this.birthDate = userProfileSnapshot.data().birthDate;
          });
  }

  logOut(): void {
      this.authService.logoutUser().then( () => {
          this.router.navigateByUrl('login');
      });
  }

    goToSettings() {
        this.router.navigateByUrl('/tabs/profile-settings');
    }


}
