import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { SavingsService } from 'src/services/savings.services';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { FirebaseService } from '../../services/firebase.services';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.page.html',
  styleUrls: ['./savings.page.scss'],
})
export class SavingsPage implements OnInit {
  mySavings: any[];

  constructor(private firebaseService: FirebaseService, public db: AngularFireDatabase, public navCtrl: NavController, private savingsService: SavingsService, public alertCtrl: AlertController) {
    db.list('/savings').valueChanges()
    .subscribe(savings =>
      {
           this.mySavings = savings;
    });
    console.log('length'+this.mySavings);
   }
   ionViewWillEnter(){
    
   }

  ngOnInit() {
  }

  buttonAddSavings (){
    this.navCtrl.navigateForward('/add-savings');
    
  }

  editSaving(indexes){
    let menu = "savings";
  let editable= this.firebaseService.editMenu(indexes, menu,this.mySavings);
  console.log(editable);
    this.navCtrl.navigateForward('/add-savings');
  }
 deleteSaving(index){
   let menu = "savings";
    this.firebaseService.onDelete(index,menu);

}


}
