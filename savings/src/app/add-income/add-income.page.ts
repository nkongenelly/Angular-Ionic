import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/services/savings.services';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.page.html',
  styleUrls: ['./add-income.page.scss'],
})
export class AddIncomePage implements OnInit {
  mySaving: {savings:String,amount: Number,id?: Number}[] = [];

  ionViewWillEnter(){
    this.mySaving = this.savingsService.getOneSaving();
  }
  constructor(private savingsService: SavingsService, public navCtrl: NavController) { }

  ngOnInit() {
  }
  onAddIncome(value:{savings: String,amount: Number}){

    this.savingsService.addSavings(value);
    this.navCtrl.navigateBack('/income');
  }

  onEditSavings(value:{savings: String,amount: Number,id?: Number}){
    this.savingsService.replaceSavings(value);
    this.navCtrl.navigateBack('/income');
    this.mySaving = [];
    console.log(this.savingsService.getMySaving);
  }

}
