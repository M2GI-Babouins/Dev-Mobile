import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaylistPage } from './playlist.page';

import { PlaylistPageRoutingModule } from './playlist-routing.module';
import { CreatePlaylistComponent } from '../modals/create-playlist/create-playlist.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuModule } from '../menu/menu.module';
import { SharePlaylistComponent } from '../modals/share-playlist/share-playlist.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlaylistPageRoutingModule,
    MenuModule
  ],
  declarations: [PlaylistPage, CreatePlaylistComponent, SharePlaylistComponent]
})
export class PlaylistPageModule { }
