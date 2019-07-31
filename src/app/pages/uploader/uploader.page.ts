import { Component, OnInit } from '@angular/core';
import { storage, initializeApp } from 'firebase';
import {environment} from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {SafeResourceUrl} from '@angular/platform-browser';
import {NavigationExtras, Router} from '@angular/router';
import {EditImagePage} from '../edit-image/edit-image.page';
// import { NavController } from 'ionic-angular';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],

})

export class UploaderPage implements OnInit {

    public guestPicture: string = null;
    photo: SafeResourceUrl;

  constructor(
      private camera: Camera,
      private router: Router) {
  }

  ngOnInit() {
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
            // this.router.navigateByUrl('tabs/edit-image', this.photo);
            this.openDetailsWithState();
            // this.navCtrl.push(EditImagePage, { image: this.photo });
        }, (err) => {
            // Handle error
        });
    }

    openDetailsWithState() {
        const navigationExtras: NavigationExtras = {
            state: {
                photo: this.photo
            }
        };
        this.router.navigate(['tabs/edit-image'], navigationExtras);
    }




}
