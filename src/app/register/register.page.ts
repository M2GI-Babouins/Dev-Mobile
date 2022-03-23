import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  title = "Register";
  submited = false;
  registerform: FormGroup= new FormGroup({
    username: new FormControl(),
    pwd: new FormControl(),
    email: new FormControl()
  });
  
  constructor(public formBuilder: FormBuilder, private authService: AuthService) { 
  }

  registering(){
    this.submited = true;
    if (!this.registerform.valid) {
      alert('Please provide all values!')
    } else {
      //auth succes
      this.authService.register(this.registerform.get("email").value, this.registerform.get("pwd").value);
    }
  }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pwd: ['', [Validators.required]]
   })
  }

  get errorControl() {
    return this.registerform.controls;
  }
}
