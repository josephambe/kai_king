import {Component, Input, OnInit} from '@angular/core';
import {TableService} from '../../services/table/table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavController, NavParams} from '@ionic/angular';


@Component({
    selector: 'app-module-page',
    templateUrl: './module-page.page.html',
    styleUrls: ['./module-page.page.scss'],
})
export class ModulePagePage implements OnInit {

    @Input() tableId;
    string;
    public currentTable: any = {};
    public guestName = '';
    public guestList: Array<any>;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tableService: TableService,
        private modalCtrl: ModalController,
    ) {
    }

    ngOnInit() {

        // Responsible for accessing the current table
        this.tableService
            .getTableDetail(this.tableId)
            .get()
            .then(tableSnapshot => {
                this.currentTable = tableSnapshot.data();
                this.currentTable.id = tableSnapshot.id;
                this.currentTable.guests = this.guestList;
            });
    }


    dismiss() {
        this.modalCtrl.dismiss({
            dismissed: true
        });
    }

    addGuest(guestName: string): void {
        this.tableService
            .addGuest(
                guestName,
                this.currentTable.id,
            )
            .then(() => {
                this.guestName = '';
                return Promise.resolve('Chef Added');

            });
        this.dismiss();
    }


}
