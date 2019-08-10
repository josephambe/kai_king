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

    @Input() tableId; string;



    public currentTable: any = {};
    public guestName = '';
    public guestList: Array<any>;


    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private tableService: TableService,
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private navCtrl: NavController,
      ) {

      console.log(navParams.get('tableId'));

     }



  ngOnInit() {

      this.tableService
          .getTableDetail(this.tableId)
          .get()
          .then(tableSnapshot => {
              this.currentTable = tableSnapshot.data();
              this.currentTable.id = tableSnapshot.id;
              this.currentTable.guests = this.guestList;
          });

      this.tableService
          .tableListRef
          .doc(this.tableId)
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
  }


    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            dismissed: true
        });
    }

    addGuest(guestName: string): void {
        this.tableService
            .addGuest(
                guestName,
                this.currentTable.id,
                // this.guestPicture
            )
            .then(() => {
                this.guestName = '';
                // this.guestPicture = null;
                return Promise.resolve('Chef Added');

            });
        this.dismiss();
    }

    goBack() {
      console.log(this.navCtrl.pop());
      this.navCtrl.pop();
    }

}
