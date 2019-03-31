import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.page.html',
  styleUrls: ['./offering.page.scss'],
})
export class OfferingPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  buttonAddOffering (){
    this.navCtrl.navigateForward('/add-offering');
  }
  

}
