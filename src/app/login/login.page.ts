import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title: "Login";
  connectForm: FormGroup= new FormGroup({
    username: new FormControl(),
    pwd: new FormControl()
  });

  register: any;
  
  constructor(public formBuilder: FormBuilder,private authService:AuthService) { }

  ngOnInit() {
  }

  connect() {
    this.authService.login(this.connectForm.get("username").value, this.connectForm.get("pwd").value);
    console.log("Conexion");
  }
}
