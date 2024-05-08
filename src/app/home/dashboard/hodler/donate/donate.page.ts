import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/firebase.service.service';
@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  user: any = {}
  id: string = '';
  fullName:string =''
  donationForm: FormGroup;
  dateRestricter: string;
  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  constructor(private formBuilder: FormBuilder, private nav: Router, private fireService: FirebaseServiceService) {
    this.donationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(45)]],
      bloodType: ['', Validators.required],
      requestDate: ['', Validators.required],
      requestLocation: ['', Validators.required],
      donorRecipient: ['', Validators.required],
      registrationType: ['', Validators.required],
      termsAgreed: [false, Validators.requiredTrue],
    });
    let f = new Intl.DateTimeFormat('en-Us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date()).split(' ')
    let d = f[0].split('/')[2] + '-' + f[0].split('/')[0] + '-' + f[0].split('/')[1]
    this.dateRestricter = d.replace(',', '') + 'T' + f[1]
  }
ngOnInit() {
  this.id = this.nav.url.slice(0, this.nav.url.lastIndexOf('/')).slice(this.nav.url.slice(0, this.nav.url.lastIndexOf('/')).lastIndexOf('/') + 1)
  if (this.id) {
    this.fireService.getUser(this.id).subscribe(data => {
      this.user = data
      this.fullName= `${data.firstName } ${data.lastName}`
    }, err => console.log(err))
  } else {
    this.nav.navigate(['/home'])
  }
  }

  onSubmit() {
    if (this.donationForm.valid) {
      this.fireService.donationSubmit(this.donationForm.value,this.id)
      this.donationForm.reset()
    }
  }
}



  

