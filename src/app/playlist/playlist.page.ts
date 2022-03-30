import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePlaylistComponent } from '../modals/create-playlist/create-playlist.component';
import { Playlist } from '../models/playlist';
import { PlaylistService } from '../services/playlist.service';
import { EMPTY, Observable } from 'rxjs';
import {  AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { SharePlaylistComponent } from '../modals/share-playlist/share-playlist.component';

@Component({
  selector: 'app-playlist',
  templateUrl: 'playlist.page.html',
  styleUrls: ['playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  title = "Playlist";
  playlists$: Observable<Playlist[]> = EMPTY;
  playlists: Playlist[];
  playlistsCollection : AngularFirestoreCollection<Playlist>;
  playlistDocuments : DocumentChangeAction<Playlist>[];
  user : any;

  constructor(private playlistService: PlaylistService,
    private modalController: ModalController,
    private authService : AuthService) {
  }

   ngOnInit() {
   this.playlists$ =this.playlistService.getAll();
   this.playlists$.subscribe(playlists =>this.getPlaylistsOfUser(playlists))
  }

  async getPlaylistsOfUser(playlists: Playlist[]){
    this.user = await this.authService.getConnectedUser();
    this.playlists = playlists.filter(p => {
      return p.owner === this.user.uid || p.readers?.includes(this.user.uid) || p.writers?.includes(this.user.uid)
    })
    .map(playlist => {
      if(playlist.owner === this.user.uid || playlist.writers.includes(this.user.uid)){
        playlist.hasWritingRights = true;
      }else{
        playlist.hasWritingRights = false;
      }
      return playlist;
    });
  }

  delete(playlist: Playlist) {
    this.playlistService.removePlaylistNew(playlist);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreatePlaylistComponent
    });
    await modal.present();
    // this.playlists = this.playlistService.getAll();
  }

  async share(playlist: Playlist){
    const modal = await this.modalController.create({
      component: SharePlaylistComponent,
      componentProps: {
        playlist: playlist
      }
    });
    await modal.present();
  }

}
