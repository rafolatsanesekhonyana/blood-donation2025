import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  session: boolean = false;
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private nav: NavController, private ctl:AlertController,private tost: ToastController) {

  }
 
  register(registerForm: any) {
    const { email, firstName, lastName, contactNumber, gender, bloodType, donorRecipient, registrationType,location,hospitalName } = registerForm.value
    this.auth.createUserWithEmailAndPassword(email, registerForm.value.password)
      .then((userCredential) => {
        // Add user data to Firestore
        
      
          this.firestore.collection('users').doc(userCredential.user?.uid).set( registrationType==="individual"?
            {
              email,
              firstName,
              lastName,
              contactNumber,
              gender,
              bloodType,
              donorRecipient,
              registrationType,
              location,
              id: userCredential.user?.uid
            } : {
              email,
              firstName,
              lastName,
              contactNumber,
              gender,
              bloodType,
              donorRecipient,
              registrationType,
              location,
              hospitalName,
              id: userCredential.user?.uid
            }
          )
        this.tost.create({
          message: 'Successfully registered',
          position: 'bottom',
          duration: 5000
        }).then(e => e.present())
      })
      .catch((err: FirebaseError) => {
        if (err.code === 'auth/email-already-in-use') {
          this.ctl.create({
            header: 'Email',
            message: 'Email already exists, go to login',
            buttons: [{
              text: 'Okay',
              handler: () => this.nav.navigateBack(['/loging']),

            }]
          }).then(c => c.present())
          return
        }
        console.log('Fail to register: ' + err.code)
      })
  }

  loging(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password).then(res => {
        this.session = true;
        resolve(res)
        this.nav.navigateForward(['/dashboard',res.user?.uid]);
      },
    error =>{ reject(error)
      this.tost.create({
        message:'Wrong password or username',
        position:'bottom',
        duration:5000
      }).then(e=>e.present())}
      );
    });

  }
  getUser(id:string):Observable<any> {
    return this.firestore.collection('users').doc(id).valueChanges()
  }
  donationSubmit(request: any, id: string) {
    this.firestore.collection(`users/${id}/requests`).add({
      requestDate: request.requestDate,
      age: request.age,
      requestLocation: request.requestLocation,
      status: 'pending'
}).then(ref1=> {
  ref1.set({
    requestDate: request.requestDate,
    age: request.age,
    requestLocation: request.requestLocation,
    status: 'pending',
    id:ref1.id})
  this.firestore.collection(`requests`).add({
    ...request, id: ref1.id, donorId: id, status: 'pending'
  }).then(allId =>{
    allId.set({ 
      ...request, 
      id: ref1.id, 
      donorId: id, status: 'pending',
      allId: allId.id,
    })
  })
  this.tost.create({
    message: 'Successfully submitted',
    position: 'bottom',
    duration: 5000
  }).then(e => e.present())
    })
  }
  requestSubmit(request: any, id: string) {
    this.firestore.collection(`users/${id}/requests`).add({
      requestDate: request.requestDate,
      age: request.age,
      requestLocation: request.requestLocation,
      status: 'pending'
    }).then(ref1 => {
      ref1.set({
        requestDate: request.requestDate,
        age: request.age,
        requestLocation: request.requestLocation,
        requestType: 'recipient',
        status: 'pending',
        timing:request.timing,
        id: ref1.id
      })
      this.firestore.collection(`requests`).add({
        ...request, id: ref1.id, donorId: id, status: 'pending'
      }).then(allId => {
        allId.set({
          ...request,
          id: ref1.id,
          recipientId: id, status: 'pending',
          allId: allId.id,
          requestType: 'recipient',
        })
      })
      this.tost.create({
        message: 'Successfully submitted',
        position: 'bottom',
        duration: 5000
      }).then(e => e.present())
    })
  }
  getRequests():Observable<any[]>{
    return this.firestore.collection('requests').valueChanges()
  }
  // donate(donation: any, id: string) {
  //   addDoc(collection(this.firestore, `users/${id}/appointments`),
  //     {
  //       appoimentDate: donation.appoimentDate,
  //       appointmentLocation: donation.appointmentLocation,
  //       recipient: donation.recipient,
  //       recipientId: donation.recipientId,
  //       recipientType: donation.recipientType,
  //       requestId: donation.requestId,
  //       status: 'pending'
  //     }

  //   ).then(ref => {
  //     setDoc(ref, {
        
  //     })
  //     addDoc(collection(this.firestore, `users/${donation.recipientId}/appointments`),
  //       {
  //         appoimentDate: donation.appoimentDate,
  //         appointmentLocation: donation.appointmentLocation,
  //         donor: donation.donor,
  //         donorId: donation.donorId,
  //         donorType: donation.donorType,
  //         requestId: donation.requestId,
  //         status: 'pending',
  //         id: ref.id
  //       }

  //     ).then(ref2 => {
  //       setDoc(ref2,
  //         {
            
  //         }
  //       )
  //       addDoc(collection(this.firestore, `appointments`),
  //         {
  //           appoimentDate: donation.appoimentDate,
  //           appointmentLocation: donation.appointmentLocation,
  //           recipient: donation.recipient,
  //           donor: donation.donor,
  //           bloodType: donation.bloodType,
  //           donorId: donation.donorId,
  //           donorType: donation.donorType,
  //           recipientId: donation.recipientId,
  //           requestId: donation.requestId,
  //           recipientType: donation.recipientType,
  //           status: 'pending',
  //           id: ref.id,
  //         }).then(ref3 => {
  //           setDoc(ref3,
             
  //           )
  //           updateDoc(doc(this.firestore, 'users', id, 'appointments', ref.id), { recipientUid: ref2.id })
  //           updateDoc(doc(this.firestore, 'users', id, 'appointments', ref.id), { allId: ref3.id })
  //           updateDoc(doc(this.firestore, 'users', donation.recipientId, 'appointments', ref2.id), { allId: ref3.id })
  //         })
  //       updateDoc(doc(this.firestore, 'allrequests', donation.allId), { status: 'accepted' })
  //       updateDoc(doc(this.firestore, 'users', donation.recipientId, 'requests', donation.requestId), { status: 'accepted' })
  //       console.log('success')
  //     })

  //     console.log('success')
  //   })


  // }
  donate(donation: any, id: string) {
    this.firestore.collection(`users/${id}/appointments`).add(
      {
        appoimentDate: donation.appoimentDate,
        appointmentLocation: donation.appointmentLocation,
        recipient: donation.recipient,
        recipientId: donation.recipientId,
        recipientType: donation.recipientType,
        requestId: donation.requestId,
        status: 'pending'
      }
    ).then(ref => {
      ref.set({
        appoimentDate: donation.appoimentDate,
        appointmentLocation: donation.appointmentLocation,
        recipient: donation.recipient,
        recipientId: donation.recipientId,
        recipientType: donation.recipientType,
        requestId: donation.requestId,
        status: 'pending',
        id: ref.id
      })
      this.firestore.collection(`users/${donation.recipientId}/appointments`).add(
        {
          appoimentDate: donation.appoimentDate,
          aappoimentDate: donation.appoimentDate,
          appointmentLocation: donation.appointmentLocation,
          donor: donation.donor,
          donorId: donation.donorId,
          donorType: donation.donorType,
          requestId: donation.requestId,
          status: 'pending',
          id: ref.id,
        }
      ).then(ref2 => {
        ref2.set(
          {
            appoimentDate: donation.appoimentDate,
            appointmentLocation: donation.appointmentLocation,
            donor: donation.donor,
            donorId: donation.donorId,
            donorType: donation.donorType,
            requestId: donation.requestId,
            status: 'pending',
            id: ref.id,
            recipientUid: ref2.id,
          }
        )
        this.firestore.collection(`appointments`).add(
          {
            appoimentDate: donation.appoimentDate,
            appointmentLocation: donation.appointmentLocation,
            recipient: donation.recipient,
            donor: donation.donor,
            bloodType: donation.bloodType,
            donorId: donation.donorId,
            donorType: donation.donorType,
            recipientId: donation.recipientId,
            requestId: donation.requestId,
            recipientType: donation.recipientType,
            status: 'pending',
            id: ref.id,
            recipientUid: ref2.id,
          }
        ).then(ref3 => {
           ref3.set(
              {
             appoimentDate: donation.appoimentDate,
             appointmentLocation: donation.appointmentLocation,
             recipient: donation.recipient,
             donor: donation.donor,
             bloodType: donation.bloodType,
             donorId: donation.donorId,
             donorType: donation.donorType,
             recipientId: donation.recipientId,
             requestId: donation.requestId,
             recipientType: donation.recipientType,
             status: 'pending',
             id: ref.id,
             recipientUid: ref2.id,
             alld: ref3.id
           }
              
            )
            this.firestore.collection('users/'+id+ '/appointments').doc( ref.id).update({ recipientUid:ref2.id })
            this.firestore.collection('users/'+id+ '/appointments').doc( ref.id).update({ allId: ref3.id })
            this.firestore.collection('users/'+donation.recipientId+ '/appointments').doc( ref2.id).update({ allId: ref3.id })
        
          })
          this.firestore.collection('requests').doc(donation.allId).update({ status: 'accepted' })
          this.firestore.collection('users/'+donation.recipientId+ '/requests').doc(donation.requestId).update({ status: 'accepted' })
        console.log('success')
      })

      this.tost.create({
        message: 'Donation went successfully',
        position: 'bottom',
        duration: 5000
      }).then(e => e.present())
    })
  }


  // donate2(donation: any, id: string) {
  //   this.firestore.collection(`users/${id}/appointments`).add(
  //     {
  //       appoimentDate: donation.appoimentDate,
  //       appointmentLocation: donation.appointmentLocation,
  //       recipient: donation.recipient,
  //       recipientId: donation.recipientId,
  //       recipientType: donation.recipientType,
  //       requestId: donation.requestId,
  //       status: 'pending'
  //     }
  //   ).then(ref => {
  //     ref.set({
  //       appoimentDate: donation.appoimentDate,
  //       appointmentLocation: donation.appointmentLocation,
  //       recipient: donation.recipient,
  //       recipientId: donation.recipientId,
  //       recipientType: donation.recipientType,
  //       requestId: donation.requestId,
  //       status: 'pending',
  //       id: ref.id
  //     })
  //     this.firestore.collection(`users/${donation.recipientId}/appointments`).add(
  //       {
  //         appoimentDate: donation.appoimentDate,
  //         appointmentLocation: donation.appointmentLocation,
  //         donor: donation.donor,
  //         donorId: donation.donorId,
  //         donorType: donation.donorType,
  //         requestId: donation.requestId,
  //         status: 'pending',
  //         id: ref.id
  //       }
  //     ).then(ref2 => {
  //       ref2.set(
  //         {
  //           appoimentDate: donation.appoimentDate,
  //           appointmentLocation: donation.appointmentLocation,
  //           donor: donation.donor,
  //           donorId: donation.donorId,
  //           donorType: donation.donorType,
  //           requestId: donation.requestId,
  //           status: 'pending',
  //           id: ref.id,
  //           recipientUid: ref2.id,
  //         }
  //       )
  //       this.firestore.collection(`appointments`).add(
  //         {
  //           appoimentDate: donation.appoimentDate,
  //           appointmentLocation: donation.appointmentLocation,
  //           recipient: donation.recipient,
  //           donor: donation.donor,
  //           bloodType: donation.bloodType,
  //           donorId: donation.donorId,
  //           donorType: donation.donorType,
  //           recipientId: donation.recipientId,
  //           requestId: donation.requestId,
  //           recipientType: donation.recipientType,
  //           status: 'pending',
  //           id: ref.id,
  //         }
  //       ).then(ref3 => {
  //         ref3.set(
  //           {
  //             appoimentDate: donation.appoimentDate,
  //             appointmentLocation: donation.appointmentLocation,
  //             recipient: donation.recipient,
  //             donor: donation.donor,
  //             bloodType: donation.bloodType,
  //             donorId: donation.donorId,
  //             donorType: donation.donorType,
  //             recipientId: donation.recipientId,
  //             requestId: donation.requestId,
  //             recipientType: donation.recipientType,
  //             status: 'pending',
  //             id: ref.id,
  //             recipientUid: ref2.id,
  //             alld: ref3.id
  //           }
  //         )
  //         this.firestore.collection('users/' + id + '/appointments').doc(ref.id).update({ recipientUid: ref2.id })
  //         this.firestore.collection('users/' + id + '/appointments').doc(ref.id).update({ allId: ref3.id })
  //         this.firestore.collection('users/' + donation.recipientId + '/appointments').doc(ref2.id).update({ allId: ref3.id })

  //       })
  //       this.firestore.collection('requests').doc(donation.allId).update({ status: 'accepted' })
  //       this.firestore.collection('users/' + donation.recipientId + '/requests').doc(donation.requestId).update({ status: 'accepted' })
  //       console.log('success')
  //     })

  //     console.log('success')
  //   })
  // }
  
  requestBlood(donation: any, id: string) {
    this.firestore.collection(`users/${id}/appointments`).add({
      appoimentDate: donation.appoimentDate,
      appointmentLocation: donation.appointmentLocation,
      donor: donation.donor,
      donorId: donation.donorId,
      donorType: donation.donorType,
      status: 'pending',
    }).then(ref => {
      ref.set({
        appoimentDate: donation.appoimentDate,
        appointmentLocation: donation.appointmentLocation,
        donor: donation.donor,
        donorId: donation.donorId,
        donorType: donation.donorType,
        status: 'pending',
        requestId: donation.requestId,
        id: ref.id
      })
      this.firestore.collection( `users/${donation.donorId}/appointments`).add({
        appoimentDate: donation.appoimentDate,
        appointmentLocation: donation.appointmentLocation,
        recipient: donation.recipient,
        recipientId: donation.recipientId,
        recipientType: donation.recipientType,
        status: 'pending',
        requestId: donation.requestId,
        id: ref.id
      }).then(ref2 => {
        ref2.set(
          {
            appoimentDate: donation.appoimentDate,
            aappoimentDate: donation.appoimentDate,
            appointmentLocation: donation.appointmentLocation,
            recipient: donation.recipient,
            recipientId: donation.recipientId,
            recipientType: donation.recipientType,
            status: 'pending',
            requestId: donation.requestId,
            id: ref.id,
            donorUid: ref2.id
          }
        )
       this.firestore.collection( `appointments`).add({
         appoimentDate: donation.appoimentDate,
         appointmentLocation: donation.appointmentLocation,
         recipient: donation.recipient,
         donor: donation.donor,
         bloodType: donation.bloodType,
         donorId: donation.donorId,
         donorType: donation.donorType,
         recipientId: donation.recipientId,
         recipientType: donation.recipientType,
         requestId: donation.requestId,
         status: 'pending',
         id: ref.id,
         donorUid: ref2.id,
       }).then(ref3 => {
            ref3.set(
              {
                aappoimentDate: donation.appoimentDate,
                appointmentLocation: donation.appointmentLocation,
                recipient: donation.recipient,
                donor: donation.donor,
                bloodType: donation.bloodType,
                donorId: donation.donorId,
                donorType: donation.donorType,
                recipientId: donation.recipientId,
                recipientType: donation.recipientType,
                requestId: donation.requestId,
                status: 'pending',
                id: ref.id,
                donorUid: ref2.id,
                allId: ref3.id,
              }

            )
         this.firestore.collection('users/' + id + '/appointments').doc(ref.id).update({ donorUid: ref2.id })
         this.firestore.collection('users/' + id + '/appointments').doc(ref.id).update({ allId: ref3.id })
         this.firestore.collection('users/' + donation.donorId + '/appointments').doc(ref2.id).update({donorUid: ref3.id})
          })
        this.firestore.collection('requests').doc(donation.allId).update({ status: 'accepted' })
        this.firestore.collection('users/' + donation.donorId+ '/requests').doc(donation.requestId).update({ status: 'accepted' })
        this.tost.create({
          message: 'Request went successfully',
          position: 'bottom',
          duration: 5000
        }).then(e => e.present())
      })
    })
  }
  getUserAppointments(id: string): Observable<any[]> {
    return this.firestore.collection('users/' + id + '/appointments').valueChanges()
  }
  cancelAppointment(app: any) {
    this.firestore.collection('appointments').doc(app.allId).update({ status: 'Cancelled' })
    this.firestore.collection('users/' +app.donorid+ '/appointments').doc(app.donorUid).update({ status: 'Cancelled' })
    this.firestore.collection('users/' +app.recipientId+ '/appointments').doc(app.recipientUid).update({ status: 'Cancelled' })
  }
  doneAppointment(app: any) {
    this.firestore.collection('appointments').doc(app.allId).update({ status: 'Done' })
    this.firestore.collection('users/' + app.donorid + '/appointments').doc(app.donorUid).update({ status: 'Done' })
    this.firestore.collection('users/' + app.recipientId + '/appointments').doc(app.recipientUid).update({ status: 'Done' })
  }
  sendFeedback(name:string,comment:string){
    this.firestore.collection('feedback').add({
      name,comment
    }).then(ref=>{
      this.tost.create({
        message: 'Feedback sent successfully',
        position: 'bottom',
        duration: 5000
      }).then(e => e.present())
    })
  }
  getFeedbacks():Observable<any[]>{
    return this.firestore.collection('feedback').valueChanges()
  }
  logout(){
    this.auth.signOut().then(e=>{
      console.log('logout')
      this.nav.navigateBack(['home'])
    })
  }
  expireDonor(req:any){
    this.firestore.collection('requests').doc(req.allId).update({ status: 'Expired' })
    this.firestore.collection('users/' + req.donorId + '/requests').doc(req.requestId).update({ status: 'Expered' })
  }
  expireRecipient(req: any) {
    this.firestore.collection('requests').doc(req.allId).update({ status: 'Expired' })
    this.firestore.collection('users/' + req.recipientId + '/requests').doc(req.requestId).update({ status: 'Expered' })
  }
  expireApp(app: any) {
    this.firestore.collection('appointments').doc(app.allId).update({ status: 'Not attended' })
    this.firestore.collection('users/' + app.donorid + '/appointments').doc(app.donorUid).update({ status: 'Not attended' })
    this.firestore.collection('users/' + app.recipientId + '/appointments').doc(app.recipientUid).update({ status: 'Not attended' })
  }
}
