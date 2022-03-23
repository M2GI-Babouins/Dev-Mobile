import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GoogleAuthProvider} from 'firebase/auth';
import { Playlist } from '../models/playlist';
//import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/compat';
import { Auth } from '@angular/fire/auth';
import { Observable, EMPTY } from 'rxjs';
import { FirebaseUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersCollection$ : AngularFirestoreCollection<FirebaseUser>;
  users: FirebaseUser[];

  constructor(private auth: AngularFireAuth, private router:Router,
    private afs: AngularFirestore) {
    this.usersCollection$ = this.afs.collection<FirebaseUser>('users');
    this.usersCollection$.valueChanges().subscribe(users => {
      this.users = users;
    });
  }

  authByGoogle(){
    //Plugins.GoogleAuthProvider(null);
    const provider = new GoogleAuthProvider();
    console.log(this.auth);
    this.auth.signInWithPopup(provider)
    .then (() => {
      this.router.navigate(["/playlist"])
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    });
  }

 

  login(email:string, password:string){
    this.auth.signInWithEmailAndPassword(email, password)
    .then (() => {
      this.router.navigate(["/playlist"])
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
    });
    
  }

  logout(): void {
    this.auth.signOut()
    .then (() => {
      this.router.navigate(["/login"]);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
    });
  }
 
  register(email: string, password:string){
    this.auth.createUserWithEmailAndPassword(email, password)
    .then (async () => {
      const userId = (await this.getConnectedUser()).uid;
      const user: FirebaseUser = {
        id: userId,
        email: email,
        password: password
      };
      this.usersCollection$.add(user);
      this.router.navigate(["/playlist"]);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
    });    
  }

  async getConnectedUser(){
    return await this.auth.currentUser;
  }

  getConnectedUserId(){
    return this.auth.currentUser;
  }

  getUserByEmail(userEmail: string){
    return this.users.filter(user => user.email === userEmail)[0];
  }
}
