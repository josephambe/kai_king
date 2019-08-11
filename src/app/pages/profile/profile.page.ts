import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import {TableService} from '../../services/table/table.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    public userProfile: any;
    public userTables: Array<any> = [];
    public userPhotos: Array<any> = [];
    public pun: string;

    constructor(
      private alertCtrl: AlertController,
      private authService: AuthService,
      private profileService: ProfileService,
      private router: Router,
      private tableService: TableService,

) { }

  ngOnInit() {

      this.profileService
          .getUserProfile()
          .get()
          .then( userProfileSnapshot => {
              this.userProfile = userProfileSnapshot.data();
          });

      this.tableService
          .tableListRef.get().then( tableSnapshot => {
          tableSnapshot.forEach(table => {
              console.log(table.id, ' => ', table.data());
              this.tableService
                  .tableListRef
                  .doc(table.id)
                  .collection(`postList`)
                  .get()
                  .then(tableListSnapshot => {
                      tableListSnapshot.forEach(snap => {
                          this.userPhotos.push({
                              photoTitle: snap.data().photoTitle,
                              photoDescription: snap.data().photoDescription,
                              picture: snap.data().picture,
                              tableID: table.id,
                          });
                          console.log(snap.data().photoTitle);


                          return false;
                      });
                  });

          });
      });


  }

    doRefresh(event) {
        const punArray = [
            'You are one in a melon',
            'I love you from my head tomatoes',
            'Life is spec-taco-ular',
            'You look radishing today',
        ];
        const randomNumber = Math.floor(Math.random()* punArray.length);
        this.pun = punArray[randomNumber];

        setTimeout(() => {
            event.target.complete();
        }, 4000);
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
