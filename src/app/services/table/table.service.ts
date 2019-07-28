import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  // This service will allow users to
    // create their own tables
    // get a full list of tables
    // get a particular table from the list

  public tableListRef: firebase.firestore.CollectionReference;

  constructor() {
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              this.tableListRef = firebase
                  .firestore()
                  .collection(`/userProfile/${user.uid}/tableList`);
          }
      });
  }

  createTable(
      tableName: string,
      tableDate: string,
      tablePrice: number,
      tableCost: number
  ): Promise<firebase.firestore.DocumentReference> {
      return this.tableListRef.add({
          name: tableName,
          date: tableDate,
          price: tablePrice * 1,
          cost: tableCost * 1,
          revenue: tableCost * -1,
      });
  }

  getTableList(): firebase.firestore.CollectionReference {
      return this.tableListRef;
  }

  getTableDetail(tableId: string): firebase.firestore.DocumentReference {
      return this.tableListRef.doc(tableId);
  }
}
