import { Component, OnInit } from '@angular/core';
import { storage, initializeApp } from 'firebase';
import {environment} from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileChooser } from '@ionic-native/file-chooser';
import * as firebase from 'firebase';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],

})

export class UploaderPage implements OnInit {
    private imageSrc: string;

  constructor(private camera: Camera) {
      initializeApp(environment);
  }

  ngOnInit() {
  }

  async fileChanged(event) {
      try {
          // const reader = new FileReader();
          // const file = await event.target.files;
          // reader.onloadend = evt => {
          //     const blob = new Blob([file], { type: 'image/jpeg' });
          //
          //     const storageUrl = 'pictures/myPictures/';
          //     const storageRef = firebase.storage().ref(storageUrl + file.name);
          //     console.warn(file); // Watch Screenshot
          //     storageRef.put(file).then(snapshot => {
          //         console.log('Uploaded a blob or file!');
          //     });
          // };
          //
          // reader.onerror = e => {
          //     console.log('Failed file read: ' + e.toString());
          // };
          // reader.readAsArrayBuffer(file);

          const storageUrl = 'pictures';

          const file = await event.target.files[0];
          // const data = await new Response(file).text()
          console.log(file);
          // this.fileChooser.open()
          //     .then(uri => console.log(uri))
          //     .catch(e => console.log(e));
          // const image = `data:image/jpeg;base64,${file}`;
          const image = file.toBase64;

          const blob = new Blob([image], { type: 'image/jpeg' });

          const storageRef = firebase.storage().ref(storageUrl + file.name);

          // const pictures = storageRef.child('pictures/myPicture');
          storageRef.putString(image).then(snapshot => {
              console.log('Uploaded a blob or file!');
          });


      } catch (e) {

          console.error(e);

      }

  }

    // uploadToFirebase(_imageBlobInfo) {
    //     const storageRef = firebase.storage().ref();
    //     const file =  event.target.files;
    //
    //     const image = storageRef.child(`data:image/jpeg;base64,${file}`);
    //
    //
    // }

  async takePhoto() {
      try {
          // defining camera options
          const options: CameraOptions = {
              quality: 80,
              targetHeight: 600,
              targetWidth: 600,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              correctOrientation: true,
          };

          const result = await this.camera.getPicture(options);

          const image = `data:image/jpeg;base64,${result}`;

          const pictures = storage().ref('pictures/myPicture');
          pictures.putString(image, 'data_url');

      } catch (e) {

          console.error(e);

      }
  }

    private openGallery() {
        const camera: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        }

        this.camera.getPicture(camera)
            .then(file_uri => {
                    return this.imageSrc = file_uri;
                },
                err => console.log(err));
    }



}
