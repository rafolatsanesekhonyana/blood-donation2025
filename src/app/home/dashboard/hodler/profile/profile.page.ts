
import { Component, OnInit, Input, model } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/firebase.service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any = {}
  id:string='';
  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private nav:Router,private fireService:FirebaseServiceService) {
    this.profileForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, this.user.email && [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      contactNumber: [this.user.contactNumber, [Validators.required, Validators.pattern('^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$')]],
      bloodType: ['', Validators.required],
      donorRecipient: ['', Validators.required],
      registrationType: ['', Validators.required],
    });
  }

  ngOnInit() { 

    this.id = this.nav.url.slice(0, this.nav.url.lastIndexOf('/')).slice(this.nav.url.slice(0, this.nav.url.lastIndexOf('/')).lastIndexOf('/') + 1)
    if (this.id) {
      this.fireService.getUser(this.id).subscribe(data=>{
        this.user = data
      },err=> console.log(err))
    } else {
      this.nav.navigate(['/home'])
    }
  }
}



