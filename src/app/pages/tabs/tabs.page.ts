import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  private tableIconColor = '#1A535C';



  @ViewChild('tabs') tabs: IonTabs
  constructor() { }

  ngOnInit() {
    this.tabs.select('table-list'); // sets default tab to table-list
  }

  changeTableIconColor() {
    this.tableIconColor = '#4ECDC4';
  }


}
