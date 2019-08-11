import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table/table.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModulePagePage } from '../module-page/module-page.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.page.html',
  styleUrls: ['./table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {

    public currentTable: any = {};
    public guestName = '';
    public guestPicture: string = null;
    photo: SafeResourceUrl;
    public tablePhotos: Array<any>;
    public guestList: Array<any>;
    public tableID = '';
    public pun: string;



    constructor(
        private tableService: TableService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private camera: Camera,
        private router: Router,
        public modalCtrl: ModalController
    ) { }

  ngOnInit() {
      const tableId: string = this.route.snapshot.paramMap.get('id');
      this.tableID = tableId;

      this.tableService
          .tableListRef
          .doc(tableId)
          .collection(`guestList`)
          .get()
          .then(guestSnap => {
              this.guestList = [];
              guestSnap.forEach(guest => {
                  this.guestList.push({
                      guestName: guest.data().guestName,
                      guestPhoto: guest.data().profilePicture,

                  });
              });
          });

      this.tableService
          .getTableDetail(tableId)
          .get()
          .then(tableSnapshot => {
              this.currentTable = tableSnapshot.data();
              this.currentTable.id = tableSnapshot.id;
              this.currentTable.guests = this.guestList;
          });

      this.tableService
          .tableListRef
          .doc(tableId)
          .collection(`postList`)
          .get()
          .then(tableListSnapshot => {
              this.tablePhotos = [];
              tableListSnapshot.forEach(snap => {
                  this.tablePhotos.push({
                      photoTitle: snap.data().photoTitle,
                      photoDescription: snap.data().photoDescription,
                      picture: snap.data().picture,
                  });

                  return false;
              });
          });
  }


    async presentModal() {
        const modal = await this.modalCtrl.create({
            component: ModulePagePage,
            componentProps: {
                tableId: this.tableID
            }
        });
        return await modal.present();
    }




    goToUploader() {
        this.router.navigateByUrl('/tabs/uploader');
    }


  // take Photo
  takePicture(sourceType: number) {
      const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType,
      }

      this.camera.getPicture(options).then((imageData) => {
          this.guestPicture = imageData;
          this.photo = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
          // Handle error
      });
  }

      // WORKS FOR BROWSER
      // console.log('Say cheese!');
      //
      // const image = await Plugins.Camera.getPhoto({
      //     quality: 100,
      //     allowEditing: false,
      //     resultType: CameraResultType.DataUrl,
      //     source: CameraSource.Camera
      // });
      //
      // console.log('Photo taken');
      //
      //
      // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  // }

    doRefresh(event) {
        const punArray = [
            'You are souper!',
            'Kick some asparag-ass!',
            'You seem like a fungi',
            'Love you. Pho real.',
        ];
        const randomNumber = Math.floor(Math.random() * punArray.length);
        this.pun = punArray[randomNumber];
        setTimeout(() => {
            event.target.complete();
        }, 4000);
    }

}
