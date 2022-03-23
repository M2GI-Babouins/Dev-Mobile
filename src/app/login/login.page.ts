import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title= "Login";
  connectForm: FormGroup= new FormGroup({
    username: new FormControl(),
    pwd: new FormControl()
  });

  register: any;
  
  constructor(public formBuilder: FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.connectForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      pwd: ['', [Validators.required]]
   })
  }

  connect() {
    if (!this.connectForm.valid) {
      alert('Bad Credential')
    } else {
      this.authService.login(this.connectForm.get("username").value, this.connectForm.get("pwd").value);
      console.log("Conexion");
    }
  }

  authByGoogle() {
    this.authService.authByGoogle();
    console.log("Conexion");
  }

  get errorControl() {
    return this.connectForm.controls;
  }
}
