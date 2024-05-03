import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  userLogged:any={}
  appointments:any[]=[]
  upcomingAppointments: any[] = []
  previousAppointments: any[] = []
 id:string
 showUp = true
  constructor(private nav: Router, private fireService: FirebaseServiceService) { 
    this.id = nav.url.slice(0, nav.url.lastIndexOf('/')).slice(nav.url.slice(0, nav.url.lastIndexOf('/')).lastIndexOf('/') + 1)
    if(this.id){
      this.fireService.getUser(this.id ?? '').subscribe(value => {
        if (value) {
          this.userLogged = value

          this.fireService.getUserAppointments(this.id).subscribe(appointments => {
            const f = appointments.filter(appointment => {
              return this.userLogged.donorRecipient !== appointment.donorRecipient && appointment.bloodType === this.userLogged.bloodType && appointment.status === 'pending'
            })
            this.appointments = appointments.map(appointment => {
              return {
                ...appointment,
                requestDate: this.fomatDate(appointment.appoimentDate)
              }
            })
            this.upcomingAppointments= this.appointments.filter(a=>a.status==='pending')
            this.previousAppointments = this.appointments.filter(a => a.status !== 'pending')
            console.log(appointments)
            
          }, err => {
            
            console.log('error occured')
          }, () => console.log('completed'))
        } else {
          this.nav.navigate(['/home'])
        }

      }, err => {
        console.log('error occured', err)
      }, () => console.log('completed'))
    }
  }

  ngOnInit() {
  }
  fomatDate(date: string): string {
    return date.replace('T', ' ')
  }
  showUpcoming(){
    this.showUp=true
  }
  showPrev() {
    this.showUp = false
  }
  cancelAppointment(app: any) {
    this.fireService.cancelAppointment(app)
  }
  doneAppointment(app: any) {
    this.fireService.doneAppointment(app)
  }
}
