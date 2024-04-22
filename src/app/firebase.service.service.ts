import { Injectable } from '@angular/core';
import {AngularFirestore}from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
session: boolean=false;
  constructor(private firestore: AngularFirestore, private auth:AngularFireAuth, private nav: NavController) {

  }
  register(user: any){
    const {name,surname,email,password,bloodType,location} = user
  this.auth.createUserWithEmailAndPassword(email, password).then(userAdded => {
    this.firestore.collection('users').doc(userAdded?.user?.uid)
      .set({name,surname,email,bloodType,location})
  }).catch(error => {console.log(error)})
  }

  loging(value:any){
    return new Promise<any>((resolve, reject)=>{
      this.auth.signInWithEmailAndPassword(value.email, value.password).then(res=>{
        this.session = true;
        resolve(res)
        this.nav.navigateForward(['/home']);
      },
    error=> reject(error)
    );
  });

  }
}
