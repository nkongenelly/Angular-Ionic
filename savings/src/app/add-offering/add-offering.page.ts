import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import {FirestoreService } from '../services/data/firestore.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-offering',
  templateUrl: './add-offering.page.html',
  styleUrls: ['./add-offering.page.scss'],
})
export class AddOfferingPage implements OnInit {

  public createOfferingForm:FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
  private router: Router
  ) { 
    this.createOfferingForm = formBuilder.group({
      offeringName: ['', Validators.required],
      amountName: ['', Validators.required],
      monthName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  async createOffering(){
    const loading = await this.loadingCtrl.create();

    const offering = this.createOfferingForm.value.offeringName;
    const amount = this.createOfferingForm.value.amountName;
    const month = this.createOfferingForm.value.monthName;

    this.firestoreService
      .createOffering(offering, amount, month)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          console.error(error);
        }
      );

    return await loading.present();
  }

}
