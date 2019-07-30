import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  // This service will allow users to
    // create their own tables
    // get a full list of tables
    // get a particular table from the list

  public tableListRef: firebase.firestore.CollectionReference;
  public currentUser: firebase.User;


  constructor() {

    this.currentUser = firebase.auth().currentUser;
    this.tableListRef = firebase.firestore().collection(`/userProfile/${this.currentUser.uid}/tableList`);

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

    addGuest(guestName: string, tableId: string, tablePrice: number, guestPicture: string = null): Promise<void> {
        return this.tableListRef
            .doc(tableId)
            .collection('guestList')
            .add({ guestName })
            .then((newGuest) => {
                return firebase.firestore().runTransaction(transaction => {

                    if (guestPicture != null) {
                        const storageRef = firebase
                            .storage().ref('/guestProfile/');
                            //.ref('/guestProfile/${newGuest.id}/profilePicture.jpeg');

                        return storageRef
                            .putString(guestPicture, 'base64')
                            .then(() => {
                                return storageRef.getDownloadURL().then(downloadURL => {
                                    return this.tableListRef
                                        .doc(tableId)
                                        .collection('guestList')
                                        .doc(newGuest.id)
                                        .update({ profilePicture: downloadURL });
                                });
                            });
                    }


                    return transaction.get(this.tableListRef.doc(tableId)).then(eventDoc => {
                        const newRevenue = eventDoc.data().revenue + tablePrice;
                        transaction.update(this.tableListRef.doc(tableId), { revenue: newRevenue });
                    });
                });


            });
    }
}
