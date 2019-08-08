import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  isRegistering = {name:false};

  constructor(
    public router: Router
  ) {
    
   }

  ngOnInit() {
  }

  // the below functions pass queryparams which will enable only reading of information and not writting in the registration forms
  showHospitals(){
    this.isRegistering['dashboardPage'] = "/hospital";
    this.router.navigate(['/hospital'],{
      queryParams: {
        value : JSON.stringify(this.isRegistering || null)
       },
      });
  }

  showPatients(){
    this.router.navigate(['/login']);
    // this.isRegistering['dashboardPage'] = "/patients";
    // this.router.navigate(['/patients'],{
    //   queryParams: {
    //     value : JSON.stringify(this.isRegistering || null)
    //    },
    //   });
  }

   showPharmaceuticals(){
    this.isRegistering['dashboardPage'] = "/pharmaceuticals";
    this.router.navigate(['/pharmaceuticals'],{
      queryParams: {
        value : JSON.stringify(this.isRegistering || null)
       },
      });
  }

  showDoctors(){
    this.isRegistering['dashboardPage'] = "/doctors";
    this.router.navigate(['/doctors'],{
      queryParams: {
        value : JSON.stringify(this.isRegistering || null)
       },
      });
  }

  showSecondopinionfacility(){
    this.isRegistering['dashboardPage'] = "/secondopinionfacility";
    this.router.navigate(['/secondopinionfacility'],{
      queryParams: {
        value : JSON.stringify(this.isRegistering || null)
       },
      });
  }
}
