import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder, } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form :FormGroup;

  constructor(private builder: FormBuilder, private db:FirebaseServiceService) {
    this.form = this.builder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      location: ['', Validators.required],
      bloodType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    this.db.register(this.form.value)
    console.log(this.form.value)
  }



}
