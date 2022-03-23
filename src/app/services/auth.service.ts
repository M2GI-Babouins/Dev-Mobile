import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    const userId = (await this.getConnectedUser()).uid;
    const user: FirebaseUser = {
      id: userId,
      email: email,
      password: password
    };
    this.usersCollection$.add(user);
    this.router.navigate(["/playlist"]);
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
