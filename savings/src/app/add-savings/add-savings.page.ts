import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/services/savings.services';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-savings',
  templateUrl: './add-savings.page.html',
  styleUrls: ['./add-savings.page.scss'],
})
export class AddSavingsPage implements OnInit {

  constructor(private savingsService: SavingsService, public navCtrl: NavController) { }

  ngOnInit() {
  }
  onAddSavings(value:{savings: String,amount: Number}){
    this.savingsService.addSavings(value);
    this.navCtrl.navigateBack('/savings');
  }

}
