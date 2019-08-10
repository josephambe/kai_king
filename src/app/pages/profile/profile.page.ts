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
    public tableList: Array<any>;


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

  logOut(): void {
      this.authService.logoutUser().then( () => {
          this.router.navigateByUrl('login');
      });
  }

    goToSettings() {
        this.router.navigateByUrl('/tabs/profile-settings');
    }



}
