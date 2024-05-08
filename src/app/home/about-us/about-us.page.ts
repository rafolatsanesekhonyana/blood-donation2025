import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
feedbacks:any=[]
  constructor(private fire: FirebaseServiceService) { 
    this.fire.getFeedbacks().subscribe(data=>this.feedbacks=data.slice(0,5))
  }

  ngOnInit() {
  }
   
}
