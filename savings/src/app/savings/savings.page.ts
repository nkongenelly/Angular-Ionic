import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { SavingsService } from 'src/services/savings.services';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.page.html',
  styleUrls: ['./savings.page.scss'],
})
export class SavingsPage implements OnInit {
  mySavings: {savings: String, amount: Number}[] = [];
  constructor(public navCtrl: NavController, private savingsService: SavingsService, public alertCtrl: AlertController) {

   }
   ionViewWillEnter(){
    this.mySavings = this.savingsService.getMySaving();
   }

  ngOnInit() {
  }

  buttonAddSavings (){
    this.navCtrl.navigateForward('/add-savings');
  }
  editSavings(data){
    let editSaving = data.getAttribute('allSavings');
    let editAmount = data.getAttribute('amounts');
    this.navCtrl.navigateForward('/edit-savings');

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
