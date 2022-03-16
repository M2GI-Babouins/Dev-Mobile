import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Playlist } from '../models/playlist';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router:Router) {
    //this.auth.authState.subscribe(user => {
    //  if (user) {
    //    this.connectedUser.next(user);
    //  }
    //})
  }


  async authByGoogle(){
    let googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
    await this.auth.signInAndRetrieveDataWithCredential(credential);
  }

  async login(email:string, password:string){
    await this.auth.signInWithEmailAndPassword(email, password).then();
    this.router.navigate(["/playlist"])
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(["/login"])
  }

  async register(email: string, password:string){
    await this.auth.createUserWithEmailAndPassword(email, password);
    this.router.navigate(["/playist"])
  }

  getConnectedUser(){
    return this.auth.currentUser;
  }
}
