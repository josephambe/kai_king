import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table/table.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.page.html',
  styleUrls: ['./table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {

    public currentTable: any = {};
    public guestName = '';

    constructor(
        private tableService: TableService,
        private route: ActivatedRoute,
    ) { }

  ngOnInit() {
      const tableId: string = this.route.snapshot.paramMap.get('id');
      this.tableService
          .getTableDetail(tableId)
          .get()
          .then(tableSnapshot => {
              this.currentTable = tableSnapshot.data();
              this.currentTable.id = tableSnapshot.id;
          });
  }

  addGuest(guestName: string): void {
      this.tableService
          .addGuest(
              guestName,
              this.currentTable.id,
              this.currentTable.price,
          )
          .then(() => this.guestName = '' );
  }

}
