import {Component, OnInit} from '@angular/core';
import {TableService} from '../../services/table/table.service';

@Component({
    selector: 'app-feed',
    templateUrl: './table-list.page.html',
    styleUrls: ['./table-list.page.scss'],
})
export class TableListPage implements OnInit {

    public tableList: Array<any>;
    public guestList: Array<any> = [];
    public pun: string;

    constructor(private tableService: TableService) {
    }

    ngOnInit() {

        // Responsible for returning each table in the current users accounnt
        // and its corresponding guest list
        this.tableService
            .getTableList()
            .get()
            .then(tableListSnapshot => {
                this.tableList = [];
                tableListSnapshot.forEach(snap => {
                    this.tableService
                        .tableListRef
                        .doc(snap.id)
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
                            this.tableList.push({
                                id: snap.id,
                                name: snap.data().name,
                                description: snap.data().description,
                                guests: this.guestList,
                            });
                        });
                });
            });


    }

    doRefresh(event) {
        const punArray = [
            'Thanks for pudding up with me',
            'You are soy awesome',
            'Have an egg-cellent day!',
            'Today is a good day to be a couch potato',
        ];
        const randomNumber = Math.floor(Math.random() * punArray.length);
        this.pun = punArray[randomNumber];
        setTimeout(() => {
            event.target.complete();
        }, 4000);
    }


}
