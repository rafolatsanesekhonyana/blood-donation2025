import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.page.html',
  styleUrls: ['./recipient.page.scss'],
})
export class RecipientPage implements OnInit {

  user: any = {}
  id: string = '';
  fullName: string = ''
  requestForm: FormGroup;
  dateRestricter:string;
  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  constructor(private formBuilder: FormBuilder, private nav: Router, private fireService: FirebaseServiceService,private activad: ActivatedRoute) {
    this.requestForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(45)]],
      bloodType: ['', Validators.required],
      requestDate: ['', Validators.required],
      requestLocation: ['', Validators.required],
      donorRecipient: ['',Validators.required],
      registrationType: ['', Validators.required],
      timing: ['',Validators.required],
      termsAgreed: [false, Validators.requiredTrue],
    });
    this.dateRestricter = new Date().toString()
    
    this.id = this.nav.url.slice(0, this.nav.url.lastIndexOf('/')).slice(this.nav.url.slice(0, this.nav.url.lastIndexOf('/')).lastIndexOf('/') + 1)
        if (this.id) {
          this.fireService.getUser(this.id).subscribe(data => {
            this.user = data
            this.fullName = `${data.firstName} ${data.lastName}`
            let f = new Intl.DateTimeFormat('en-Us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date()).split(' ')
            let d = f[0].split('/')[2] + '-' + f[0].split('/')[0] + '-'+f[0].split('/')[1]
            this.dateRestricter =d.replace(',','')+'T'+f[1]
          }, err => console.log(err))
        } else {
          this.nav.navigate(['/home'])
        }

  }
  ngOnInit() {
    this.requestForm.get('timing')?.valueChanges.subscribe(() => {
      if (this.requestForm.getRawValue().timing) {
        this.requestForm.get('donationDate')?.clearValidators()
        this.requestForm.get('donationDate')?.updateValueAndValidity()
      } else {
        this.requestForm.get('donationDate')?.setValidators(Validators.required)
        this.requestForm.get('donationDate')?.updateValueAndValidity()
      }
    })
   
  }

  onSubmit() {
    if (this.requestForm.valid) {
      // Handle form submission logic here
      this.fireService.requestSubmit(this.requestForm.value,this.id)
      console.log(this.requestForm.value);
    }
  }

}
