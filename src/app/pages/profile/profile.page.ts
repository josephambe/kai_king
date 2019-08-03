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

    public userTables: Array<any> = [];
    public userPhotos: Array<any> = [];

    constructor(
      private alertCtrl: AlertController,
      private authService: AuthService,
      private profileService: ProfileService,
      private router: Router,
      private tableService: TableService,

) { }

  ngOnInit() {
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
                          });
                          console.log(snap.data().photoTitle);


                          return false;
                      });
                  });
              // this.userTables.push({
              //     tableId: table.id,
              // });
          });
      });

      // this.userTables.forEach(table => {
      for(const t of this.userTables) {
          console.log('testing');
          this.tableService
              .tableListRef
              .doc(t.tableId)
              .collection(`postList`)
              .get()
              .then(tableListSnapshot => {
                  this.userPhotos = [];
                  tableListSnapshot.forEach(snap => {
                      this.userPhotos.push({
                          photoTitle: snap.data().photoTitle,
                          photoDescription: snap.data().photoDescription,
                          picture: snap.data().picture,
                      });
                      console.log(snap.data().photoTitle);


                      return false;
                  });
              });
      }



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
