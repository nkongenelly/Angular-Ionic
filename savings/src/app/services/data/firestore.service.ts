import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Offering } from '../../models/offering.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

createOffering(
    offering: String,
    amount: Number,
    month: String
  ): Promise<void> 
     { 
      const id = this.firestore.createId();
      return this.firestore.doc(`offering/${id}`).set({
        id,
        offering,
        month,
        amount
      });
      }

    }