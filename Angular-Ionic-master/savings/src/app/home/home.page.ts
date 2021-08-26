import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SavingsPage } from '../savings/savings.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController){

  }

  buttonSavings (){
    this.navCtrl.navigateForward('/savings');
  }
  buttonIncome (){
    this.navCtrl.navigateForward('/income');
  }
  buttonProjects (){
    this.navCtrl.navigateForward('/projects');
  }
  buttonMonthly(){
    this.navCtrl.navigateForward('/monthly');
  }
  buttonOffering(){
    this.navCtrl.navigateForward('/offering');
  }

}
