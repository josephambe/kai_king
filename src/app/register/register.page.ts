import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UserInfo, LoginService } from './../services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
    repassword: string;
    newUser: UserInfo = {
        username: '',
        password: ''
    };

    userID = null;


  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private loadingController: LoadingController,
              private loginService: LoginService) {
  }

  ngOnInit() {
      // this.userID = this.route.snapshot.params.id;
      // if (this.userID) {
      //     this.loadUser();
      // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register Page');
  }

  async register() {
      // console.log('Username: ' + this.username);
      // console.log('Password: ' + this.password);
      // console.log('Repassword: ' + this.repassword);
      //
      //
      // if (this.username && this.password && this.repassword) {
      //     alert('Welcome to Kai King ' + this.username + '!');
      // } else {
      //     alert('Please fill in all fields');
      //
      // }

      /**TO DO: Make sure duplicate emails and usernames aren't allowed**/
      const loading = await this.loadingController.create({
          message: 'Welcoming you to the whanau'
      });
      await loading.present();

      if (this.userID) {
          this.loginService.updateUser(this.newUser, this.userID).then(() => {
              loading.dismiss();
              this.nav.navigateBack('tabs/tab1');
          });
      } else {
          this.loginService.addUser(this.newUser).then(() => {
              loading.dismiss();
              this.nav.navigateBack('tabs/tab1');
          });
      }

  }

    //     /**
    //      * Handles the sign in button press.
    //      */
    //     toggleSignIn() {
    //         if (firebase.auth().currentUser) {
    //             // [START signout]
    //             firebase.auth().signOut();
    //             // [END signout]
    //         } else {
    //             const email = (document.getElementById('email') as HTMLInputElement).value;
    //             const password = (document.getElementById('password') as HTMLInputElement).value;
    //             if (email.length < 4) {
    //                 alert('Please enter an email address.');
    //                 return;
    //             }
    //             if (password.length < 4) {
    //                 alert('Please enter a password.');
    //                 return;
    //             }
    //             // Sign in with email and pass.
    //             // [START authwithemail]
    //             firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    //                 // Handle Errors here.
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //                 // [START_EXCLUDE]
    //                 if (errorCode === 'auth/wrong-password') {
    //                     alert('Wrong password.');
    //                 } else {
    //                     alert(errorMessage);
    //                 }
    //                 console.log(error);
    //                 (document.getElementById('quickstart-sign-in') as HTMLInputElement).disabled = false;
    //                 // [END_EXCLUDE]
    //             });
    //             // [END authwithemail]
    //         }
    //         (document.getElementById('quickstart-sign-in') as HTMLInputElement).disabled = true;
    //     }
    // /**
    //  * Handles the sign up button press.
    //  */
    // handleSignUp() {
    //     const email = (document.getElementById('email') as HTMLInputElement).value;
    //     const password = (document.getElementById('password') as HTMLInputElement).value;
    //     if (email.length < 4) {
    //         alert('Please enter an email address.');
    //         return;
    //     }
    //     if (password.length < 4) {
    //         alert('Please enter a password.');
    //         return;
    //     }
    //     // Sign in with email and pass.
    //     // [START createwithemail]
    //     firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // [START_EXCLUDE]
    //         if (errorCode === 'auth/weak-password') {
    //             alert('The password is too weak.');
    //         } else {
    //             alert(errorMessage);
    //         }
    //         console.log(error);
    //         // [END_EXCLUDE]
    //     });
    //     // [END createwithemail]
    // }
    // /**
    //  * Sends an email verification to the user.
    //  */
    // sendEmailVerification() {
    //     // [START sendemailverification]
    //     firebase.auth().currentUser.sendEmailVerification().then(() => {
    //         // Email Verification sent!
    //         // [START_EXCLUDE]
    //         alert('Email Verification Sent!');
    //         // [END_EXCLUDE]
    //     });
    //     // [END sendemailverification]
    // }
    // sendPasswordReset() {
    //     const email = (document.getElementById('email') as HTMLInputElement).value;
    //     // [START sendpasswordemail]
    //     firebase.auth().sendPasswordResetEmail(email).then(() => {
    //         // Password Reset Email Sent!
    //         // [START_EXCLUDE]
    //         alert('Password Reset Email Sent!');
    //         // [END_EXCLUDE]
    //     }).catch(error => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // [START_EXCLUDE]
    //         if (errorCode === 'auth/invalid-email') {
    //             alert(errorMessage);
    //         } else if (errorCode === 'auth/user-not-found') {
    //             alert(errorMessage);
    //         }
    //         console.log(error);
    //         // [END_EXCLUDE]
    //     });
    //     // [END sendpasswordemail];
    // }
    // /**
    //  * initApp handles setting up UI event listeners and registering Firebase auth listeners:
    //  *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
    //  *    out, and that is where we update the UI.
    //  */
    // initApp() {
    //     // Listening for auth state changes.
    //     // [START authstatelistener]
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         // [START_EXCLUDE silent]
    //         (document.getElementById('quickstart-verify-email') as HTMLInputElement).disabled = true;
    //         // [END_EXCLUDE]
    //         if (user) {
    //             // User is signed in.
    //             const displayName = user.displayName;
    //             const email = user.email;
    //             const emailVerified = user.emailVerified;
    //             const photoURL = user.photoURL;
    //             const isAnonymous = user.isAnonymous;
    //             const uid = user.uid;
    //             const providerData = user.providerData;
    //             // [START_EXCLUDE]
    //             document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    //             document.getElementById('quickstart-sign-in').textContent = 'Sign out';
    //             document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
    //             if (!emailVerified) {
    //                 (document.getElementById('quickstart-verify-email') as HTMLInputElement).disabled = false;
    //             }
    //             // [END_EXCLUDE]
    //         } else {
    //             // User is signed out.
    //             // [START_EXCLUDE]
    //             document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
    //             document.getElementById('quickstart-sign-in').textContent = 'Sign in';
    //             document.getElementById('quickstart-account-details').textContent = 'null';
    //             // [END_EXCLUDE]
    //         }
    //         // [START_EXCLUDE silent]
    //         ( document.getElementById('quickstart-sign-in') as HTMLInputElement).disabled = false;
    //         // [END_EXCLUDE]
    //     });
    //     // [END authstatelistener]
    //     document.getElementById('quickstart-sign-in').addEventListener('click', this.toggleSignIn, false);
    //     document.getElementById('quickstart-sign-up').addEventListener('click', this.handleSignUp, false);
    //     document.getElementById('quickstart-verify-email').addEventListener('click', this.sendEmailVerification, false);
    //     document.getElementById('quickstart-password-reset').addEventListener('click', this.sendPasswordReset, false);
    // }

  // getDataFromFirebase() {
  //     this.afd.list('/users').valueChanges().subscribe(
  //         data => {
  //             console.log(JSON.stringify(data));
  //             this.items = data;
  //         }
  //     );
  //
  // }

}
