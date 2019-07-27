import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 //Create a new record in the specified collection using add method
  create_NewHospital(record) {
    return this.firestore.collection('hospitals').add(record);
  }
  //Call snapshotChanges method which will get records and also subscribe it to get updates
  read_Hospital() {
    return this.firestore.collection('hospitals').snapshotChanges();
  }
 //Update record by taking ID then calling update method
  update_Hospital(recordID,record){
    this.firestore.doc('hospitals/' + recordID).update(record);
  }
 //Call delete method by taking record id
  delete_Hospital(record_id) {
    this.firestore.doc('hospitals/' + record_id).delete();
  }
}