import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent  implements OnInit {
  name:string=''
  comment:string=''
  constructor() { }

  ngOnInit() {}
  submit(){
    console.log(this.name,this.comment)
  }

}
