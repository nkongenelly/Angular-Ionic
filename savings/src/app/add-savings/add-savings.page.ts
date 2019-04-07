import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/services/savings.services';
import { NavController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.services';

@Component({
  selector: 'app-add-savings',
  templateUrl: './add-savings.page.html',
  styleUrls: ['./add-savings.page.scss'],
})
export class AddSavingsPage implements OnInit {
  mySaving: {savings:String,amount: Number,id?: Number}[] = [];


  ionViewWillEnter(){
    this.mySaving = this.savingsService.getOneSaving();
    if(this.mySaving.length >0){
    console.log(this.mySaving.length);
    }
    else{
      console.log(this.mySaving.length);
    }
    this.mySaving = this.firebaseService.replaceOneMenu();
     }
  constructor(private savingsService: SavingsService, public navCtrl: NavController,private firebaseService: FirebaseService) { 

  }

  ngOnInit() {
  }
  onAddSavings(value:{savings: String,amount: Number,month: String}){
    let menu:String = "savings";
    //this.firebaseService.onAdd(value,menu);
    //using Service to store
    this.firebaseService.onAdd(value,menu);
    this.navCtrl.navigateBack('/savings');
  }

  onEditSavings(value:{savings: String,amount: Number,id?: String,month: String}){
    console.log(value);
    let menu = "savings";
    this.firebaseService.onEdit(value,menu);
    //this.savingsService.replaceSavings(value);
    this.mySaving = [];
    this.navCtrl.navigateBack('/savings');
   
  }

}
