import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { actionSheetController } from '@ionic/core';

export interface UserInfo {
  id?: string;
  username: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userInfoCollection: AngularFirestoreCollection<UserInfo>;
  private localUsers: Observable<UserInfo[]>;

    constructor(db: AngularFirestore) {
        this.userInfoCollection = db.collection<UserInfo>('users');
        this.localUsers = this.userInfoCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(element => {
                    const data = element.payload.doc.data();
                    const id = element.payload.doc.id;
                    return {id, ...data };
                });
            })
        );
    }

    getUsers() {
        return this.localUsers;
    }

    getUserInfo(id) {
        return this.userInfoCollection.doc<UserInfo>(id).valueChanges();
    }

    updateUser(entryBeingUpdated: UserInfo, id: string) {
        return this.userInfoCollection.doc(id).update(entryBeingUpdated);
    }

    addUser(newEntry: UserInfo) {
        return this.userInfoCollection.add(newEntry);
    }

    removeUser(id) {
        return this.userInfoCollection.doc(id).delete();
    }
}
