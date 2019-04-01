import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/services/savings.services';
import { NavController } from '@ionic/angular';

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
   }
  constructor(private savingsService: SavingsService, public navCtrl: NavController) { }

  ngOnInit() {
  }
  onAddSavings(value:{savings: String,amount: Number}){
    this.savingsService.addSavings(value);
    this.navCtrl.navigateBack('/savings');
  }

  onEditSavings(value:{savings: String,amount: Number,id?: Number}){
    this.savingsService.replaceSavings(value);
    this.navCtrl.navigateBack('/savings');
    this.mySaving = [];
    console.log(this.savingsService.getMySaving);
  }

}
