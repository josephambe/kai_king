import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table/table.service';
import { ActivatedRoute } from '@angular/router';
// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// const { Camera } = Plugins;

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
    currentImage: any;



    constructor(
        private tableService: TableService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private camera: Camera,
    ) { }

  ngOnInit() {
      const tableId: string = this.route.snapshot.paramMap.get('id');
      this.tableService
          .getTableDetail(tableId)
          .get()
          .then(tableSnapshot => {
              this.currentTable = tableSnapshot.data();
              this.currentTable.id = tableSnapshot.id;
          });
  }

  addGuest(guestName: string): void {
      this.tableService
          .addGuest(
              guestName,
              this.currentTable.id,
              this.currentTable.price,
              this.guestPicture
          )
          .then(() => {
              this.guestName = '';
              this.guestPicture = null;
          });
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
          // const base64Image = 'data:image/jpeg;base64,' + imageData;
          // this.guestPicture = 'data:image/jpeg;base64,' + imageData;
          this.guestPicture = imageData;
          this.photo = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
          // Handle error
      });
  }

    // async takePicture(): Promise<void> {

      // WORKS FOR TAKING PHOTOS
      // const options: CameraOptions = {
      //     quality: 100,
      //     destinationType: this.camera.DestinationType.DATA_URL,
      //     encodingType: this.camera.EncodingType.JPEG,
      //     mediaType: this.camera.MediaType.PICTURE
      // }
      //
      // this.camera.getPicture(options).then((imageData) => {
      //     this.currentImage = 'data:image/jpeg;base64,' + imageData;
      // }, (err) => {
      //     // Handle error
      //     console.log("Camera issue:" + err);
      // });

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








      // try {
          // const profilePicture = await Camera.getPhoto({
          //     quality: 90,
          //     allowEditing: false,
          //     resultType: CameraResultType.Base64,
          // });
      //     this.guestPicture = profilePicture.webPath; // In tutorial, they use base64Data instead of String
      // } catch (error) {
      //     console.error(error);
      // }
  //}

}
