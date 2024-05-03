import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit{
  id:string=''
  users:any[]=[]
   user:any={}
   showprof =signal(false)
  constructor(private router: ActivatedRoute, private nav: Router, private fireService:FirebaseServiceService) {
    this.router.paramMap.subscribe(value=>{
      if (!value.has('id')) {
        this.nav.navigate(['/home'])
      } else {
        this.id = value.get('id') ?? '';
        this.fireService.getUser(this.id).subscribe(user => {
          if (user) {
            console.log(user)
            console.log('uid', user.id)
            this.user = user 
          }else{
            this.nav.navigate(['/home'])
          }
          
        })
        
      }
    })
   }
   logout(){
    //this.fireService.logout()
   }
 ngOnInit() {
   
 }
}
