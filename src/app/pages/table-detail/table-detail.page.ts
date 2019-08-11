import {Component, OnInit} from '@angular/core';
import {TableService} from '../../services/table/table.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ModalController} from '@ionic/angular';
import {ModulePagePage} from '../module-page/module-page.page';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-table-detail',
    templateUrl: './table-detail.page.html',
    styleUrls: ['./table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {

    public currentTable: any = {};
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
    ) {
    }

    ngOnInit() {
        const tableId: string = this.route.snapshot.paramMap.get('id');
        this.tableID = tableId;

        // Responsible for accessing the guests of the current table
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

        // Responsible for creating a current table object with id and guest list
        this.tableService
            .getTableDetail(tableId)
            .get()
            .then(tableSnapshot => {
                this.currentTable = tableSnapshot.data();
                this.currentTable.id = tableSnapshot.id;
                this.currentTable.guests = this.guestList;
            });

        // Responsible for accessing the photos of the current table
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


    // used to add guests
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
