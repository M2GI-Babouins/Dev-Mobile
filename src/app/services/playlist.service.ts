import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlists: Playlist[] = [];

    //new
    playlistsCollection$ : AngularFirestoreCollection<Playlist>;
    playlists$: Observable<Playlist[]> = EMPTY;
    playlistDocuments : DocumentChangeAction<Playlist>[];
    selectedPlaylist: Playlist;
    todos: Todo[] = [];
    private playlistDoc: DocumentChangeAction<Playlist>;

  constructor( private afs: AngularFirestore) { 
    this.playlistsCollection$ = this.afs.collection<Playlist>('playlists');
    this.playlists$ = this.playlistsCollection$.valueChanges({idField: 'id'});

    this.playlists$?.subscribe(p => this.playlists = p);

    this.playlistsCollection$.snapshotChanges()
    .subscribe(docs => this.playlistDocuments = docs);
  }

  loadPlaylists(p: Playlist[]){
    this.playlists = p;
  }

  getAll() {
    return this.afs.collection<Playlist>('playlists').valueChanges({idField: 'id'}); 
  }

  getOnePlaylist(id: string){
    return this.playlistsCollection$.doc(`${id}`).valueChanges({idField: 'id'});
  }

  getOnePlaylistTodos(id: string){
    return this.afs.collection<Todo>(`playlists/${id}/todos`).valueChanges({idField: 'id'});
  }

  getTodosCollection(id: string){
    return this.afs.collection<Todo>(`playlists/${id}/todos`);
  }

  addPlaylist(playlist: Playlist) {
    this.playlistsCollection$.add(playlist);
    this.playlists = this.playlists.concat(playlist);
  }

  updatePlaylist(playlist: Playlist){
    this.afs.collection<Playlist>('playlists').doc(`${playlist.id}/`).update(playlist);
  }

  removePlaylist(playlist: Playlist) {
    this.playlists = this.playlists.filter(p => p.id !== playlist.id);
  }

  removePlaylistNew(playlist: Playlist){
    const playlistToDelete = this.playlistsCollection$.doc(`/${playlist.id}`);
    playlistToDelete.delete();
  }

  addTodo(playlistId: string, newTodo: Todo) {
    const todosCollection$ = this.getTodosCollection(playlistId);
    todosCollection$.add(newTodo);
  }

  removeTodo(playlistId: string, todo: Todo) {
    this.getTodosCollection(playlistId).doc(`${todo.id}/`).delete();
  }

  checkTodo(playlistId: string, todo: Todo){
    this.getTodosCollection(playlistId).doc(`${todo.id}/`).update(todo);
  }
}
