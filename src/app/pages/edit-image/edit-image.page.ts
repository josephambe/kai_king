import { Component, OnInit } from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { TableService } from '../../services/table/table.service';
import {AlertController, LoadingController} from '@ionic/angular';

import {forEach} from '@angular-devkit/schematics';


@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.page.html',
  styleUrls: ['./edit-image.page.scss'],
})
export class EditImagePage implements OnInit {

    public photo: string = null;
    public photoData: string = null;
    public tableList: Array<any>;
    public selected: Array<any> = [];
    public selectedTable: any;
    public loading: HTMLIonLoadingElement;


    photoTitle: any;
    photoDescription: any;
    photoTable: any;



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tableService: TableService,
        public alertController: AlertController,
        public loadingCtrl: LoadingController,

) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.photo = this.router.getCurrentNavigation().extras.state.photo;
                this.photoData = this.router.getCurrentNavigation().extras.state.photoData;
            }
        });
    }

    ngOnInit() {
        this.tableService
            .getTableList()
            .get()
            .then(tableListSnapshot => {
                this.tableList = [];
                tableListSnapshot.forEach(snap => {
                    this.tableList.push({
                        id: snap.id,
                        name: snap.data().name,
                        price: snap.data().price,
                        date: snap.data().date,
                    });
                    return false;
                });
            });
    }

    // Restricts selection to one table at a time
    Selection(name: string, table) {
        this.tableList.forEach(x => {
            if (x.name !== name) {
                x.value = !x.value;

                this.selectedTable = table;
            }
        });
    }


    async uploadPhoto(
        votes: any, // feature to be implemented in next iteration
    ): void {
        if (
            this.photoTitle === undefined ||
            this.photoDescription === undefined ||
            this.selectedTable === undefined
        ) {
            this.presentAlert();
        }
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();

        this.tableService
            .addPhoto(this.photoTitle, this.photoDescription, this.selectedTable, this.photoData, votes)
            .then(() => {
                this.loading.dismiss().then(() => {
                    // console.log('loading upload');
                    this.router.navigateByUrl('tabs/profile');
                });
            });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Whoops!',
            message: 'Make sure every field is filled.',
            buttons: ['OK']
        });

        await alert.present();
    }

}
