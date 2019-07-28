import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './table-list.page.html',
  styleUrls: ['./table-list.page.scss'],
})
export class TableListPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

    logoutUser() {
        this.authService.logoutUser();
    }

}
