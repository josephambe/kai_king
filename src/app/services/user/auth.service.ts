import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // User is be able to:
    // Login to existing account
    // Create new account
    // Send a password reset email
    // Logout from the app

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    // This function will log in the user automatically once new account is created
      return firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((newUserCredential: firebase.auth.UserCredential) => {
              firebase
                  .firestore()
                  // create a new collection called userProfile where uid identifies user
                  .doc(`/userProfile/${newUserCredential.user.uid}`)
                  .set({ email });
          })
          .catch(error => {
              console.error(error);
              throw new Error(error);
          });
  }

  resetPassword(email: string): Promise<void> {
      return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
      return firebase.auth().signOut();
  }

}
