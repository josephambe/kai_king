import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table/table.service';

@Component({
  selector: 'app-feed',
  templateUrl: './table-list.page.html',
  styleUrls: ['./table-list.page.scss'],
})
export class TableListPage implements OnInit {

    public tableList: Array<any>;

  constructor(private tableService: TableService) { }

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
                      description: snap.data().description,
                      // price: snap.data().price,
                      // date: snap.data().date,
                  });
                  return false;
              });
          });
  }



}
