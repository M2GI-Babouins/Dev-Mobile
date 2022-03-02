import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  submited = false;
  registerform: FormGroup= new FormGroup({
    username: new FormControl(),
    pwd: new FormControl(),
    email: new FormControl()
  });
  
  constructor(public formBuilder: FormBuilder) { 
  }

  registering(){
    this.submited = true;
    if (!this.registerform.valid) {
      console.log('Please provide all values!')
      return false;
    } else {
      console.log(this.registerform.value)
    }
  }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pwd: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]]
   })
  }

  get errorControl() {
    return this.registerform.controls;
  }
}
