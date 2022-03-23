import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { AuthService } from 'src/app/services/auth.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-share-playlist',
  templateUrl: './share-playlist.component.html',
  styleUrls: ['./share-playlist.component.scss'],
})
export class SharePlaylistComponent implements OnInit {
  @Input() playlist: Playlist;
  
  shareForm: FormGroup;

  constructor(private fb: FormBuilder,
    private playlistService: PlaylistService,
    private authService: AuthService,
    private modalController: ModalController) {
    this.shareForm = this.fb.group({ 
      user: ['', [Validators.required, Validators.minLength(3)]],
      right: ['', [Validators.required]] 
    });
  }

  ngOnInit() {}

  share(){
    const userEmail = this.shareForm.get('user').value;
    const userRight = this.shareForm.get('right').value;
    const user = this.authService.getUserByEmail(userEmail);
    if(userRight === 'reader'){
      this.playlist.readers.push(user.id);
    }else{
      this.playlist.writers.push(user.id);
    }
    this.playlistService.updatePlaylist(this.playlist);
    this.modalController.dismiss();

    
  }

}
