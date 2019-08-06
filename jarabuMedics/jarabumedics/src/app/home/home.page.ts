import { Component } from '@angular/core';
import { NavController } from '../../../node_modules/@ionic/angular';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navCtrl: NavController,
    public router: Router
  ) {}

  startHere(){
    this.router.navigate(["/login"]);
  }

}
