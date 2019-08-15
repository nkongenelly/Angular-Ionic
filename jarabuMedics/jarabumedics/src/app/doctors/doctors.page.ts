import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { CrudService } from '../crud.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {
  rootPage:any = TabsPage;
  patient: any;
  patientName: string;
  patientContact: number;
  patientEmail: string;
  patientSymptoms: string;
  patientHospital: string;
  patientDoctor: string;
  b : number = 4;
  isRegistering;
  showRegisteringForm;
 
  constructor(
    private navCtrl: NavController,
    private crudService: CrudService,
    private menu: MenuController,
    public activatedRoute: ActivatedRoute
  ) { 
    // get the query params if it comes from registering or else set query params if directly loggin in
     this.activatedRoute.queryParams.subscribe((res)=>{
      if(JSON.parse(res.value) != null){
        // console.log(JSON.parse(res.value));
        this.isRegistering = JSON.parse(res.value);
            //find if the logged in user has rights to right or just read i.e this.isRegistering['name'] = true means has rights to write
        if(this.isRegistering['dashboardPage'] != '/patients'){
          this.showRegisteringForm = this.isRegistering['name'];
        }
      }
    });
  }

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
