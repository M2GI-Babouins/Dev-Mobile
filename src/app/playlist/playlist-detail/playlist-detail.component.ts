import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { Playlist } from 'src/app/models/playlist';
import { Todo } from 'src/app/models/todo';
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


  constructor(private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private modalController: ModalController) { 
     }

  ngOnInit(): void {
    this.playlistService.getOnePlaylist(this.route.snapshot.params.id).subscribe((p:Playlist) =>{
      this.playlist = p;
    });

    this.playlistService.getOnePlaylistTodos(this.route.snapshot.params.id).subscribe((t) =>{
      this.todos = t;
    })
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

}
