import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { MenuController, Platform } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar/ngx';
import { SplashScreen } from '../../../node_modules/@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.page.html',
  styleUrls: ['./hospitals.page.scss'],
})
export class HospitalsPage implements OnInit {
  rootPage:any = LoginPage;
  hospitals: any;
  hospitalName: string;
  hospitalContact: number;
  hospitalAddress: string;
  b:number = 2;

  constructor(
    private crudService: CrudService,
    private menu: MenuController,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen
  ) { 
    this.menu.enable(true, 'menu');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
 
  ngOnInit() {
    this.crudService.read_Hospital(this.b).subscribe(data => {
 
      this.hospitals = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Contact: e.payload.doc.data()['Contact'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.hospitals);
 
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.hospitalName;
    record['Contact'] = this.hospitalContact;
    record['Address'] = this.hospitalAddress;

    this.crudService.create_NewHospital(record,this.b).then(resp => {
      this.hospitalName = "";
      this.hospitalContact = undefined;
      this.hospitalAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_Hospital(rowID,this.b);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditContact = record.Contact;
    record.EditAddress = record.Address;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Contact'] = recordRow.EditContact;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Hospital(recordRow.id, record,this.b);
    recordRow.isEdit = false;
  }
 
 
}

