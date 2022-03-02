import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  constructor(private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private modalController: ModalController,
    private afs: AngularFirestore) {  }

  ngOnInit(): void {
    /*this.playlist = this.playlistService.getOne(+this.route.snapshot.params.id);
    const allTodos = this.afs.collection<Todo>('todos');
      allTodos.valueChanges().subscribe(allTodo => {
        this.todos = allTodo.filter(allT => allT.playlistId === this.playlist?.id);
      });*/

    this.playlistsCollection = this.afs.collection<Playlist>('playlists');
    this.playlistsCollection.valueChanges().subscribe(allPlaylist => {
     this.playlist = allPlaylist.filter(play => play.id === +this.route.snapshot.params.id)[0];
     this.todos = this.playlist?.todos;
    });

    this.playlistsCollection.snapshotChanges()
    .subscribe(docs => this.playlistDoc = docs.filter(doc => doc.payload.doc.data().id === this.playlist.id)[0]);

    
  }

  delete(todo: Todo) {
    this.playlistService.removeTodo(this.playlist.id, todo);
    const newPlaylist = this.playlistService.getOne(this.playlist.id);
    const playlistToDeleteTodoFrom = this.playlistsCollection.doc(`/${this.playlistDoc.payload.doc.id}`);
    playlistToDeleteTodoFrom.update(newPlaylist);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        playlistId: this.playlist.id
      }
    });
    await modal.present();
    this.playlist = this.playlistService.getOne(+this.route.snapshot.params.id);
  }

}
