import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {

  hospitals: any;
  hospitalName: string;
  hospitalContact: number;
  hospitalAddress: string;
 
  constructor(private crudService: CrudService) { }
 
  ngOnInit() {
    this.crudService.read_Hospital().subscribe(data => {
 
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
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.hospitalName;
    record['Contact'] = this.hospitalContact;
    record['Address'] = this.hospitalAddress;
    this.crudService.create_NewHospital(record).then(resp => {
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
    this.crudService.delete_Hospital(rowID);
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
    this.crudService.update_Hospital(recordRow.id, record);
    recordRow.isEdit = false;
  }
 
 
}

