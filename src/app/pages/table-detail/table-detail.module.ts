import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TableDetailPage } from './table-detail.page';
import { ModulePagePage } from '../module-page/module-page.page';


const routes: Routes = [
  {
    path: '',
    component: TableDetailPage
  }
];

@NgModule({
  entryComponents: [ModulePagePage],
  imports: [
    CommonModule,
      FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TableDetailPage, ModulePagePage,]
})
export class TableDetailPageModule {}
