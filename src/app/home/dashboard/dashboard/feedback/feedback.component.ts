import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/firebase.service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent  implements OnInit {
  name:string=''
  comment:string=''
  constructor(private fire:FirebaseServiceService) { }

  ngOnInit() {}
  submit(){
    this.fire.sendFeedback(this.name,this.comment)
    this.name=''
    this.comment=''
  }

}
