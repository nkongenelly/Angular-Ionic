import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  databases:string[] = ["patients","hospitals","pharmaceuticals","doctors","secondopinionfacility"];

  constructor(
    private firestore: AngularFirestore
  ) { }
 
 //Create a new record in the specified collection using add method
  create_NewHospital(record,b) {
    for(let x = 0; x<=this.databases.length; x++){
      if(x == b){
        return this.firestore.collection(this.databases[b-1]).add(record);
      }
    }
  }
  //Call snapshotChanges method which will get records and also subscribe it to get updates
  read_Hospital(b) {
    for(let x = 0; x<=this.databases.length; x++){
      if(x == b){
        return this.firestore.collection(this.databases[b-1]).snapshotChanges();
      }
    }
  }
 //Update record by taking ID then calling update method
  update_Hospital(recordID,record,b){
    for(let x = 0; x<this.databases.length; x++){
      if(x == b){
        this.firestore.doc(this.databases[b-1] + '/' + recordID).update(record);
      }
    }
  }
 //Call delete method by taking record id
  delete_Hospital(record_id,b) {
    for(let x = 0; x<=this.databases.length; x++){
      if(x == b){
        this.firestore.doc(this.databases[b-1] + '/'  + record_id).delete();
      }
    }
  }
}