import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../../services/table/table.service';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.page.html',
  styleUrls: ['./table-create.page.scss'],
})
export class TableCreatePage implements OnInit {

  constructor(private router: Router, private tableService: TableService) { }

  ngOnInit() {
  }

    createTable(
        tableName: string,
        tableDate: string,
        tablePrice: number,
        tableCost: number
    ): void {
        if (
            tableName === undefined ||
            tableDate === undefined ||
            tablePrice === undefined ||
            tableCost === undefined
        ) {
            return;
        }
        this.tableService
            .createTable(tableName, tableDate, tablePrice, tableCost)
            .then(() => {
                this.router.navigateByUrl('');
            });
    }

}
