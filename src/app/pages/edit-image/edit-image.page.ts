import { Component, OnInit } from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.page.html',
  styleUrls: ['./edit-image.page.scss'],
})
export class EditImagePage implements OnInit {

    photo: any;



    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.photo = this.router.getCurrentNavigation().extras.state.photo;
            }
        });
    }

  ngOnInit() {
      // this.route.queryParams.subscribe(params => {
      //     this.photo = params.photo;
      // });

  }

}
