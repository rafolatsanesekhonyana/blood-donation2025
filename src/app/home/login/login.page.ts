import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: FirebaseServiceService ) {
 
  
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    onSubmit() {
      if (this.loginForm.invalid) {
        
        return;
      }
  
      // Perform login logic here, such as sending data to a backend API
      // const email = this.loginForm.value.email;
      // const password = this.loginForm.value.password;
      this.authService.loging(this.loginForm.value)
      console.log("successfully logged-in")
      // Reset form after submission
      this.loginForm.reset();
  }
  

}
