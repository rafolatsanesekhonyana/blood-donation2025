import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.page.html',
  styleUrls: ['./loging.page.scss'],
})
export class LogingPage implements OnInit {

  LogingForm: FormGroup;
  login:string=''
 authservice = inject(FirebaseServiceService)
  constructor(private formBuilder: FormBuilder) {
   
    this.LogingForm = this.formBuilder.group({
   
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.LogingForm.valid) {
      this.login=''
      this.authservice.loging(this.LogingForm.value)
      this.LogingForm.reset() 
    }
  }
  resetPassword(){
    if(this.LogingForm.get('email')?.valid) {
      //this.authservice.resetPassword(this.LogingForm.value.email)
    }
    return
  }

}
