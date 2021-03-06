import {Component, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {SafeResourceUrl} from '@angular/platform-browser';
import {NavigationExtras, Router} from '@angular/router';


@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.page.html',
    styleUrls: ['./uploader.page.scss'],

})

export class UploaderPage implements OnInit {

    public photoData: string = null;
    photo: SafeResourceUrl;

    constructor(
        private camera: Camera,
        private router: Router) {
    }

    ngOnInit() {
    }


    // Take Photo
    // sourceType 1 = camera
    // sourceType 0 = gallery
    takePicture(sourceType: number) {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType,
        };

        this.camera.getPicture(options).then((imageData) => {
            this.photoData = imageData;
            this.photo = 'data:image/jpeg;base64,' + imageData;
            this.openDetailsWithState();
        }, (err) => {
            console.log('There is an error uploading your photo!');
        });
    }

    // Preparation to pass photo to next 'Edit-image' page
    openDetailsWithState() {
        const navigationExtras: NavigationExtras = {
            state: {
                photo: this.photo,
                photoData: this.photoData
            }
        };
        this.router.navigate(['tabs/edit-image'], navigationExtras);
    }


}
