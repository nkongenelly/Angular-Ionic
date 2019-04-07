import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { FirestoreService } from '../services/data/firestore.service';
import { Offering } from '../models/offering.interface';
import { Router } from '../../../node_modules/@angular/router';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
@Component({
  selector: 'app-offering',
  templateUrl: './offering.page.html',
  styleUrls: ['./offering.page.scss'],
})
export class OfferingPage implements OnInit {
  offerings;
  constructor(public db: AngularFireDatabase, public navCtrl: NavController,public firestoreService: FirestoreService,private router:Router) {
  //   db.list('/offering').valueChanges()
  //       .subscribe(offerings => {
          
  //           this.offerings = offerings;
  //       });
  //  }

   }
  ngOnInit() {
  this.offerings = this.firestoreService.getOfferings().valueChanges();
  }
  buttonAddOffering (){
    this.navCtrl.navigateForward('/add-offering');
  }
  

}
