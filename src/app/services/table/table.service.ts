import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    // This service will allow users to:
    // create their own tables
    // get a full list of tables
    // get a particular table from the list
    // add Guests to tables
    // add photos to tables

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
        tableDescription: string,
        tableKing: string,
    ): Promise<firebase.firestore.DocumentReference> {
        return this.tableListRef.add({
            name: tableName,
            description: tableDescription,
            king: tableKing,
        });
    }

    getTableList(): firebase.firestore.CollectionReference {
        return this.tableListRef;
    }

    getTableDetail(tableId: string): firebase.firestore.DocumentReference {
        return this.tableListRef.doc(tableId);
    }


    addGuest(guestName: string, tableId: string, guestPicture: string = null): Promise<void> {

        return this.tableListRef
            .doc(tableId)
            .collection('guestList')
            .add({guestName})
            .then((newGuest) => {
                return firebase.firestore().runTransaction(transaction => {

                    if (guestPicture != null) {
                        const storageRef = firebase
                            .storage()
                            .ref(`/guestProfile/${newGuest.id}/profilePicture.jpeg`);

                        return storageRef
                            .putString(guestPicture, 'base64')
                            .then(() => {
                                return storageRef.getDownloadURL().then(downloadURL => {
                                    return this.tableListRef
                                        .doc(tableId)
                                        .collection('guestList')
                                        .doc(newGuest.id)
                                        .update({profilePicture: downloadURL});
                                });

                            });
                    }

                    return Promise.resolve(true);
                });


            });
    }

    addPhoto(photoTitle: string, photoDescription: string, table: any, picture: string = null, votes: number): Promise<void> {
        console.log('UPLOADING TO TABLE ' + table.name);

        return this.tableListRef
            .doc(table.id)
            .collection('postList')
            .add({photoTitle, photoDescription})
            .then((newPost) => {
                return firebase.firestore().runTransaction(transaction => {

                    if (picture != null) {
                        const storageRef = firebase
                            .storage()
                            .ref(`/post/${newPost.id}/picture.jpeg`);

                        return storageRef
                            .putString(picture, 'base64')
                            .then(() => {
                                return storageRef.getDownloadURL().then(downloadURL => {
                                    return this.tableListRef
                                        .doc(table.id)
                                        .collection('postList')
                                        .doc(newPost.id)
                                        .update({picture: downloadURL});
                                });
                            });
                    }


                    return transaction.get(this.tableListRef.doc(table.id).collection('postList').doc(newPost.id)).then(eventDoc => {
                        const newRanking = eventDoc.data().votes + votes;
                        transaction.update(this.tableListRef.doc(table.id), {ranking: newRanking});
                    });
                });


            });

    }
}
