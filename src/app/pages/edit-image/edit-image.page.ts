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

    public photo: string = null;
    public photoData: string = null;
    public tableList: Array<any>;
    public selected: Array<any> = [];
    public selectedTable: any;

    //Get value on ionChange on IonRadioGroup
    selectedRadioGroup:any;
    //Get value on ionSelect on IonRadio item
    selectedRadioItem:any;
    photoTitle: any;
    photoDescription: any;
    photoTable: any;



    constructor(private route: ActivatedRoute, private router: Router, private tableService: TableService) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.photo = this.router.getCurrentNavigation().extras.state.photo;
                this.photoData = this.router.getCurrentNavigation().extras.state.photoData;
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

    Selection(name: string, table, photoTable) {
        this.tableList.forEach(x => {
            if (x.name !== name) {
                x.value = !x.value;

                this.selectedTable = table;
                console.log("SELECTED: " + this.selectedTable.name + " " + this.photoTitle + " " + this.photoDescription);
            }
        });
        //this.getChanged(table, photoTable);
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
        // photoTitle: string,
        // photoDescription: string,
        // photoTable: Array<any>,
        votes: any,
    ): void {
        // photoTable = this.selectedTable;
        if (
            this.photoTitle === undefined ||
            this.photoDescription === undefined ||
            this.selectedTable === undefined
        ) {
            console.log('MISSING SOMETHING');
            // return;
        }

        this.tableService
            .addPhoto(this.photoTitle, this.photoDescription, this.selectedTable, this.photoData, votes)
            .then(() => {
                console.log('loading upload');
                this.router.navigateByUrl('tabs/profile');
            });
    }

}
