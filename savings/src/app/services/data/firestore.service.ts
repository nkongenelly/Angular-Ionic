import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Offering } from '../../models/offering.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  offerings;
  constructor(public firestore: AngularFirestore) { }

createOffering(
    offering: String,
    amount: Number,
    month: String
  ): Promise<void> 
     { 
      const id = this.firestore.createId();
      console.log(this.firestore.doc(`offering/${id}`).set({id,offering,month,amount}));
     return this.firestore.doc(`offering/${id}`).update({
        id,
        offering,
        month,
        amount
      });
      
      }
      getOfferings():AngularFirestoreCollection<Offering>{
       return this.firestore.collection('offering');
      }

    }