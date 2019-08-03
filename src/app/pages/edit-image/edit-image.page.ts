import { Component, OnInit } from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { TableService } from '../../services/table/table.service';
import {forEach} from '@angular-devkit/schematics';



@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.page.html',
  styleUrls: ['./edit-image.page.scss'],
})
export class EditImagePage implements OnInit {

    photo: any;
    public tableList: Array<any>;
    public selected: Array<any> = [];




    constructor(private route: ActivatedRoute, private router: Router, private tableService: TableService) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.photo = this.router.getCurrentNavigation().extras.state.photo;
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

    getChanged(table, photoTable) {
        // console.log(table.name);
        // console.log(table.id);
        // console.log(photoTable);
        if (photoTable) {
            this.selected.push(table);
            console.log('LENGTH: ' + this.selected.length);

        } else {
            this.removeTableFromSelected(table);
            console.log('LENGTH: ' + this.selected.length);
        }
        for (const t of this.selected) {
            console.log('NAME: ' + t.name + ' ID: ' + t.id);
        }
    }

    removeTableFromSelected(table) {
        const index: number = this.selected.indexOf(table);
        if (index !== -1) {
            this.selected.splice(index, 1);
        }
    }

    getSelectedTables() {
        for (const t of this.selected) {
            console.log('NAME: ' + t.name + ' ID: ' + t.id);
            return t.id;

        }
    }

    uploadPhoto(
        photoTitle: string,
        photoDescription: string,
        photoTable: Array<any>,
        votes: 0
    ): void {
        photoTable = this.selected;
        if (
            photoTitle === undefined ||
            photoDescription === undefined ||
            photoTable === undefined
        ) {
            return;
        }
        this.tableService
            .addPhoto(photoTitle, photoDescription, photoTable, this.photo, votes) //NEED TO PASS IN THE PROPER FORMAT FOR THIS TO WORK CORRECLTY AND UPLOAD TO STORAGE
            .then(() => {
                this.router.navigateByUrl('tabs/profile');
            });
    }

}
