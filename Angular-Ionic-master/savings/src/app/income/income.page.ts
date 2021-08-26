import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { SavingsService } from 'src/services/savings.services';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  mySavings: {savings: String, amount: Number}[] = [];

  ionViewWillEnter(){
    this.mySavings = this.savingsService.getMySaving();
   }
   
  constructor(public navCtrl: NavController,  private savingsService: SavingsService, public alertCtrl: AlertController)  { }

  ngOnInit() {
  }
  buttonAddIncome(){
    this.navCtrl.navigateForward('/add-income');

  }
  editSaving(indexes){
    let editable:{savings:String,amount: Number,id?: Number} = this.savingsService.editMySavings(indexes);
    console.log(editable);
    this.savingsService.addSaving(editable);
      this.navCtrl.navigateForward('/add-income');
    }
  async deleteSaving(index){
    let alert = await this.alertCtrl.create({
      header: 'Confirm delete user',
      message: 'Are you sure you want to permanently delete this item?',
      buttons: [
          {
              text: 'No',
              handler: () => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: 'Yes',
              handler: () => {
                this.mySavings.splice(index, 1);
              }
          }
      ]
  })
  
  
  await alert.present();
  
  }
   
  
  
  }

