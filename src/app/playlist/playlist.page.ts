import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePlaylistComponent } from '../modals/create-playlist/create-playlist.component';
import { Playlist } from '../models/playlist';
import { PlaylistService } from '../services/playlist.service';
import { EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';

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

  constructor(private playlistService: PlaylistService,
    private modalController: ModalController,
    private authService : AuthService) {
  }

   ngOnInit() {
   this.playlists$ =this.playlistService.getAll();
   this.playlists$.subscribe(playlists =>this.getPlaylistsOfUser(playlists))
  }

  async getPlaylistsOfUser(playlists: Playlist[]){
    const user = await this.authService.getConnectedUser();
    this.playlists = playlists.filter(p => p.owner === user.uid);
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

}
