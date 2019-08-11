import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TableService} from '../../services/table/table.service';

@Component({
    selector: 'app-table-create',
    templateUrl: './table-create.page.html',
    styleUrls: ['./table-create.page.scss'],
})
export class TableCreatePage implements OnInit {

    constructor(private router: Router, private tableService: TableService) {
    }

    ngOnInit() {
    }

    createTable(
        tableName: string,
        tableDescription: string,
        tableKing: string
    ): void {
        if (
            tableName === undefined ||
            tableDescription === undefined ||
            tableKing === undefined
        ) {
            return;
        }
        this.tableService
            .createTable(tableName, tableDescription, tableKing)
            .then(() => {
                this.router.navigateByUrl('tabs/table-list');
            });
    }

}
