import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { createSecureServer } from 'http2';
 
@Injectable()
export class AuthenticateService {
 
  constructor(
    private firestore: AngularFirestore
  ){}
 
  //register with email & password then add entry to users collection
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
      res => resolve(res),
       err => reject(err))
       
  })
  // .catch(error => {
  //   console.error(error);
  //   throw new Error(error);
  // });
  //return
  // this.createUser(value);
}
// createUser(value):Promise<any>{
  // return firebase
  //   .auth().createUserWithEmailAndPassword(value.email, value.password)
  //    .then((newUserCredential: firebase.auth.UserCredential) => {

  //     firebase
  //     .firestore()
  //     .doc(`/users/${newUserCredential.user.uid}`)
  //     .set({ email:value.email,category:value.category==null?'patient':value.category });
// })
// .catch(error => {
//   console.error(error);
//   throw new Error(error);
// });
createUser(value){
  return this.firestore.collection('users').add({email:value.email,category:value.category==null?'patient':value.category});
 
}
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }
  read_Users() {
    return this.firestore.collection('users').snapshotChanges();
  }
}
