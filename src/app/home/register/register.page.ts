import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/firebase.service.service';
//import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


declare var google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nearbyHospitals: any[] = [];
  map: any;
  marker: any;
  latitude: number=0;
  longitude: number=0;
  service: any;
  infowindow: any;
  name :string=''
  registerType=''
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authservice: FirebaseServiceService){

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      gender: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$')]],
      bloodType: ['', Validators.required],
      donorRecipient: ['', Validators.required],
      registrationType: ['', Validators.required],
      hospitalName: ['', Validators.required],
      location:[this.name, Validators.required]
    });

  }

 
  ngOnInit() {
    // Any additional initialization logic can go here
    this.registerForm.get('registrationType')?.valueChanges.subscribe(()=>{
      if (this.registerForm.getRawValue().registrationType==='individual') {
        this.registerForm.get('hospitalName')?.clearValidators()
        this.registerForm.get('hospitalName')?.updateValueAndValidity()
      } else {
        this.registerForm.get('hospitalName')?.setValidators(Validators.required)
        this.registerForm.get('hospitalName')?.updateValueAndValidity()
      }
    })
    
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authservice.register(this.registerForm)
      console.log(this.registerForm.value);
    }
  }
  route(){
                                                                                                                                        
  }

}