import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePlaylistComponent } from '../modals/create-playlist/create-playlist.component';
import { Playlist } from '../models/playlist';
import { PlaylistService } from '../services/playlist.service';
import { EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-playlist',
  templateUrl: 'playlist.page.html',
  styleUrls: ['playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  playlists$: Observable<Playlist[]> = EMPTY;
  playlistsCollection : AngularFirestoreCollection<Playlist>;
  playlistDocuments : DocumentChangeAction<Playlist>[];

  constructor(private playlistService: PlaylistService,
    private modalController: ModalController,
    private afs: AngularFirestore) {
    this.playlistsCollection = this.afs.collection<Playlist>('playlists');
    this.playlists$ = this.playlistsCollection.valueChanges();
  }

  ngOnInit(): void {
    // this.deleteEverything();

    this.playlistsCollection.snapshotChanges()
    .subscribe(docs => this.playlistDocuments = docs);
  }

  delete(playlist: Playlist) {
    const docId = this.playlistDocuments
    .filter(doc => doc.payload.doc.data().id === playlist.id).map(doc => doc.payload.doc.id)[0];
    const playlistToDelete = this.playlistsCollection.doc(`/${docId}`);
    playlistToDelete.delete();
    
    this.playlistService.removePlaylist(playlist);
  }

  deleteEverything(){
    this.playlistsCollection.snapshotChanges()
    .pipe(map(actions => actions.map(a =>  a.payload.doc.id)))
    .subscribe(documentId=> {
      console.log(documentId)
      const doc = this.playlistsCollection.doc<Playlist>(documentId[0]);
      console.log(doc);
      doc.delete();
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreatePlaylistComponent
    });
    await modal.present();
    // this.playlists = this.playlistService.getAll();
  }

}
