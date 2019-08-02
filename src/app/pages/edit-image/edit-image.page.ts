import { Component, OnInit } from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { TableService } from '../../services/table/table.service';



@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.page.html',
  styleUrls: ['./edit-image.page.scss'],
})
export class EditImagePage implements OnInit {

    photo: any;
    public tableList: Array<any>;
    public selected: Array<any>;




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

    getChanged(table) {
        console.log(table.name);
        console.log(table.id);
    }

    uploadPhoto(
        photoTitle: string,
        photoDescription: string,
        photoTable: string,
    ): void {
        // console.log('PHOTO TABLE: ' + photoTable);
        if (
            photoTitle === undefined ||
            photoDescription === undefined ||
            photoTable === undefined
        ) {
            return;
        }
        this.tableService
            .addPhoto(photoTitle, photoDescription, photoTable, this.photo)
            .then(() => {
                this.router.navigateByUrl('tabs/profile');
            });
    }

}
