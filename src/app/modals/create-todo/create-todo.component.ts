import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { Todo } from 'src/app/models/todo';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit, OnChanges {

  @Input() playlistId: number;

  todoForm: FormGroup;
  playlistDocId : string;
  allPlaylists: AngularFirestoreCollection<Playlist>;
  currentPlaylistDoc: AngularFirestoreDocument<Playlist>;
  currentPlaylist: Playlist;

  constructor(private fb: FormBuilder, private modalController: ModalController,
    private playlistService: PlaylistService,
    private afs: AngularFirestore) {
    this.todoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(255)]
    });

    this.allPlaylists = this.afs.collection<Playlist>('playlists');
    this.allPlaylists.snapshotChanges().subscribe(allPlaylistDoc => {
      this.playlistDocId = allPlaylistDoc.filter(doc => doc.payload.doc.data().id === this.playlistId).map(doc => doc.payload.doc.id)[0];
      this.currentPlaylistDoc = this.allPlaylists.doc(`/${this.playlistDocId}`);
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentPlaylist = this.playlistService.getOne(this.playlistId);
  }

  ngOnInit(): void {
  }

  addTodo() {
    this.currentPlaylist = this.playlistService.getOne(this.playlistId);
    const newTodo : Todo = {
      name: this.todoForm.get('name').value,
      description: this.todoForm.get('description').value,
      id: Math.floor(Math.random() * 100) + Date.now(),
      completed: false
    };
    this.currentPlaylist.todos.push(newTodo);

    const newPlaylist : Playlist = {
      id: this.currentPlaylist.id,
      name: this.currentPlaylist.name,
      todos: this.currentPlaylist.todos,
    }
    this.allPlaylists.doc(`/${this.playlistDocId}`).update(newPlaylist); // change la playlist par un todo

    this.playlistService.addTodo(this.playlistId, new Todo(this.todoForm.get('name').value, this.todoForm.get('description').value));
    this.modalController.dismiss();
  }

}
