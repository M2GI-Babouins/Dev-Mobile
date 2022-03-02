import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  connectForm: FormGroup= new FormGroup({
    username: new FormControl(),
    pwd: new FormControl()
  });

  register: any;
  
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  connect() {
    console.log(this.connectForm.value);
  }
}
