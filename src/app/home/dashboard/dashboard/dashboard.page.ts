import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {



  requests: any[] = []
  userLogged: any = {}
  showprof = signal(false)
  id: string;
  selectedType = {
    i: 0,
    value: 'all'
  }
  registrationTypes = [
    {
      title: 'All',
      value: 'all'
    },
    {
      title: 'Individual',
      value: 'individual'
    },
    {
      title: 'Hospital',
      value: 'hospital'
    },
    {
      title: 'Blood bank',
      value: 'bloodBank'
    }
  ]

  constructor(private router: ActivatedRoute, private nav: Router, private fireService: FirebaseServiceService, private alertCrl: AlertController) {
    this.id = nav.url.slice(0, nav.url.lastIndexOf('/')).slice(nav.url.slice(0, nav.url.lastIndexOf('/')).lastIndexOf('/') + 1)
    if (this.id) {
      this.fireService.getUser(this.id ?? '').subscribe(value => {
        if (value) {
          this.userLogged = value
          this.checkSelectedType(this.selectedType)
        } else {
          this.nav.navigate(['/home'])
        }

      })
    }
    this.router.paramMap.subscribe(value => {
      console.log('id', value)
      if (!value.has('id')) {
        this.nav.navigate(['/home'])
      } else {


      }
    })
  }
  fomatDate(date: string): string {
    return date.replace('T', ' ')
  }
  logout() {
    this.fireService.logout()
  }

  ngOnInit() {
  }
  checkSelectedType(check: any) {
    this.selectedType = check
    this.fireService.getRequests().subscribe(requests => {
      requests.map(req=>{
        if (req.status === 'pending' && this.userLogged.donorRecipient !== 'donor'&& req.donorRecipient==='donor' && (new Date(req.requestDate).toISOString() < new Date().toISOString())) {
          this.fireService.expireDonor({ allId: req.allId, requestId: req.id, donorId: req.donorId})
          return req
        }
        if (req.status === 'pending' && this.userLogged.donorRecipient === 'donor' && req.donorRecipient !== 'donor' && (new Date(req.requestDate).toISOString() < new Date().toISOString())) {
          this.fireService.expireRecipient({ allId: req.allId, requestId: req.id, recipientId: req.recipientId })
          return req
        }
      })
      let f = []
        if (this.selectedType.value === 'all') {
          f = requests.filter(request => {
            if (this.userLogged.donorRecipient !== 'donor') {
              return request.donorRecipient === 'donor' && (request.bloodType.slice(0, (request.bloodType).length - 1) === this.userLogged.bloodType.slice(0, (this.userLogged.bloodType).length - 1) || request.bloodType === 'O+' || request.bloodType === 'O-') && request.status === 'pending' && (new Date(request.requestDate).toISOString() > new Date().toISOString()) 
            }
            return request.donorRecipient !== 'donor' && (request.bloodType.slice(0, (request.bloodType).length - 1) === this.userLogged.bloodType.slice(0, (this.userLogged.bloodType).length - 1) || request.bloodType === 'AB+' || request.bloodType === 'AB-') && request.status === 'pending' && (new Date(request.requestDate).toISOString() > new Date().toISOString()) 
          })
      } else {
          f = requests.filter(request => {
            if (this.userLogged.donorRecipient !== 'donor') {
              return request.donorRecipient === 'donor' && (request.bloodType.slice(0, (request.bloodType).length - 1) === this.userLogged.bloodType.slice(0, (this.userLogged.bloodType).length - 1) || request.bloodType === 'O+' || request.bloodType === 'O-') && request.status === 'pending' && (new Date(request.requestDate).toISOString() > new Date().toISOString()) && request.registrationType === this.selectedType?.value
            }
            return request.donorRecipient !== 'donor' && ((request.bloodType).slice(0, (request.bloodType).length - 1) === (this.userLogged.bloodType).slice(0, (this.userLogged.bloodType).length - 1) || request.bloodType === 'AB-'  || request.bloodType === 'AB+') && request.status === 'pending' && (new Date(request.requestDate).toISOString() > new Date().toISOString())&& request.registrationType === this.selectedType?.value
          })
      }
        
      this.requests = f.map(request => {
        return {
          ...request,
          requestDate: this.fomatDate(request.requestDate)
        }
      })

    }, err => {
      console.log('error occured')
    }, () => console.log('completed'))
  }
  donate(donations: any) {
    const donation = {
      appoimentDate: donations.requestDate,
      appointmentLocation: donations.requestLocation,
      recipient: donations.fullName,
      donor: this.userLogged.firstName + ' ' + this.userLogged.lastName,
      bloodType: donations.bloodType,
      recipientId: donations.recipientId,
      donorId: this.id,
      recipientType: donations.registrationType,
      donorType: this.userLogged.registrationType,
      requestId: donations.id,
      allId: donations.allId
    }
    this.alertCrl.create({
      header: 'Alert',
      message: `Are you sure you want to donate blood to ${donation.recipient}, and read and understand terms and conditions`,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.fireService.donate(donation, this.id)

          }
        }
      ]
    }).then(e => e.present())
  }
  requestBlood(donations: any) {
    const donation = {
      appoimentDate: donations.requestDate,
      appointmentLocation: donations.requestLocation,
      recipient: this.userLogged.firstName + ' ' + this.userLogged.lastName,
      donor: donations.fullName,
      bloodType: donations.bloodType,
      recipientId: this.id,
      donorId: donations.donorId,
      recipientType: this.userLogged.registrationType,
      donorType: donations.registrationType,
      requestId: donations.id,
      allId: donations.allId
    }
    this.alertCrl.create({
      header: 'Alert',
      message: `Are you sure you want to request blood from ${donation.donor}, and read and understand terms and conditions`,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.fireService.requestBlood(donation, this.id)
            console.log(donation)
          }
        }
      ]
    }).then(e => e.present())
  }
  phone(phone:string){
    this.alertCrl.create({
      header: 'Phone',
      message:phone ,
      buttons: [ 'okay'
      ]
    }).then(e => e.present())
  }
}
