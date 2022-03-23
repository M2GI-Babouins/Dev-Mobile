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
export class CreateTodoComponent implements OnInit {

  @Input() playlist: Playlist;

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private modalController: ModalController,
    private playlistService: PlaylistService) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.maxLength(255)],
      url: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addTodo() {

    const newTodo : Todo = {
      name: this.todoForm.get('name').value,
      description: this.todoForm.get('description').value,
      id: Math.floor(Math.random() * 100) + Date.now(),
      completed: false,
      musicUrl: this.todoForm.get('url').value
    };

    this.playlistService.addTodo(this.playlist.id, newTodo);

    this.modalController.dismiss();
  }

}
