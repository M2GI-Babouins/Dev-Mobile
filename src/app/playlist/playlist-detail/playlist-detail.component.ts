import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Track } from 'ngx-audio-player';
import { Observable } from 'rxjs';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { Playlist } from 'src/app/models/playlist';
import { Todo } from 'src/app/models/todo';
import { AuthService } from 'src/app/services/auth.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {

  public playlist: Playlist;
  todos: Todo[]= [];
  playlistsCollection : AngularFirestoreCollection<Playlist>;
  private playlistDoc: DocumentChangeAction<Playlist>;
  todos$: Observable<Playlist>;
  user: any;
  canEdit: boolean;

 /* play : Track[] = [
    {
      title: 'neeko',
      artist:'riot',
      link: 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ad/Neeko_055.ogg',
    },
    {
      title: 'Start swimming',
      link: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/props-star-swimming/Props-StarSwimming.mp3" 
    },
  ]; */

  play: Track[] = [];


  constructor(private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private modalController: ModalController,
    private authService : AuthService,
    ) { 
     }

  ngOnInit() {
    this.playlistService.getOnePlaylist(this.route.snapshot.params.id).subscribe(async(p:Playlist) =>{
      this.playlist = p;
      this.user = await this.authService.getConnectedUser();
      if(this.playlist.owner === this.user.uid || this.playlist.writers.includes(this.user.uid)){
        this.playlist.hasWritingRights = true;
      }else{
        this.playlist.hasWritingRights = false;
      }
      this.canEdit = this.playlist.hasWritingRights;

    });

    this.playlistService.getOnePlaylistTodos(this.route.snapshot.params.id).subscribe((t) =>{
      this.todos = t;
      this.initPlay();
    });
    
  }

  delete(todo: Todo) {
    this.playlistService.removeTodo(this.playlist.id ,todo);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        playlist: this.playlist
      }
    });
    await modal.present();
  }

  checkTodo(todo: Todo, completed: boolean){
    todo.completed = completed;
    this.playlistService.checkTodo(this.playlist.id, todo);
  }

  private initPlay(){
    this.todos.forEach(music => {
      this.play.push({
        title: music.name,
        artist: music.description,
        link: music.musicUrl,
      });
    });
  }

  onEnded(event: any){

  }

  playMusic(music: Todo){

  }



}
