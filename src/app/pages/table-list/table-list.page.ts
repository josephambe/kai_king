import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table/table.service';

@Component({
  selector: 'app-feed',
  templateUrl: './table-list.page.html',
  styleUrls: ['./table-list.page.scss'],
})
export class TableListPage implements OnInit {

    public tableList: Array<any>;
    public guestList: Array<any> = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {
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
                              console.log('TABLE: ', snap.data().name);
                              console.log('GUEST: ', guest.data().guestName);
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


}
