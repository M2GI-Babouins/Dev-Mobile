import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GoogleAuthProvider} from 'firebase/auth';
import { Playlist } from '../models/playlist';
//import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/compat';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router:Router, private auth:AngularFireAuth) {
    //this.auth.authState.subscribe(user => {
    //  if (user) {
    //    this.connectedUser.next(user);
    //  }
    //})
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
    this.router.navigate(["/playlist"])
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
    .then (() => {
      this.router.navigate(["/playlist"]);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
    });    
  }

  getConnectedUser(){
    return this.auth.currentUser;
  }
}
