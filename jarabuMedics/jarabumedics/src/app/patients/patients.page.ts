import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { CrudService } from '../crud.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  rootPage:any = TabsPage;
  patient: any;
  patientName: string;
  patientContact: number;
  patientEmail: string;
  patientSymptoms: string;
  patientHospital: string;
  patientDoctor: string;
  b : number = 1;
 
  constructor(
    private navCtrl: NavController,
    private crudService: CrudService,
    private menu: MenuController,
  ) { }

  ngOnInit() {
    this.crudService.read_Hospital(this.b).subscribe(data => {
 
      this.patient = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Email: e.payload.doc.data()['Email'],
          Contact: e.payload.doc.data()['Contact'],
          Symptoms: e.payload.doc.data()['Symptoms'],
          Hospital: e.payload.doc.data()['Hospital'],
          Doctor: e.payload.doc.data()['Doctor'],
        };
      })
      console.log(this.patient);
 
    });
  }
  CreateRecord() {
    let record = {};
    record['Name'] = this.patientName;
    record['Contact'] = this.patientContact;
    record['Email'] = this.patientEmail;
    record['Symptoms'] = this.patientSymptoms;
    record['Hospital'] = this.patientHospital;
    record['Doctor'] = this.patientDoctor;
    this.crudService.create_NewHospital(record,this.b).then(resp => {
      this.patientName = "";
      this.patientContact = undefined;
      this.patientEmail = "";
      this.patientSymptoms = "";
      this.patientHospital = '';
      this.patientDoctor = "";
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
    record.EditEmail = record.Email;
    record.EditSymptoms = record.Symptoms;
    record.EditHospital = record.Hospital;
    record.EditDoctor = record.Doctor;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Contact'] = recordRow.EditContact;
    record['Email'] = recordRow.EditEmail;
    record['Symptoms'] = recordRow.EditSymptoms;
    record['Hospital'] = recordRow.EditHospital;
    record['Doctor'] = recordRow.EditDoctor;
    this.crudService.update_Hospital(recordRow.id, record,this.b);
    recordRow.isEdit = false;
  }
 
}
