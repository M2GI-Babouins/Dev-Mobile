import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent implements OnInit {

  playlistForm: FormGroup
  playlistsCollection : AngularFirestoreCollection<Playlist>;
  playlistDocuments : DocumentChangeAction<Playlist>[];

  constructor(private fb: FormBuilder, private playlistService: PlaylistService,
    private modalController: ModalController,
    private afs: AngularFirestore) {
    this.playlistsCollection = this.afs.collection<Playlist>('playlists');
    this.playlistForm = this.fb.group({ name: ['', [Validators.required, Validators.minLength(3)]] });
  }

  ngOnInit() { 
    this.playlistsCollection.snapshotChanges()
    .subscribe(docs => this.playlistDocuments = docs);
  }

  addPlaylist() {
    const newPlayList: Playlist = {
      id: Math.floor(Math.random() * 100) + Date.now(),
      name: this.playlistForm.get('name').value};
    this.playlistsCollection.add(newPlayList);

    this.modalController.dismiss();
  }

}
