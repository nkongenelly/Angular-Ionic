import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  isRegistering:any={};
  showRegisteringForm;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
   
    // get the query params if it comes from registering or else set query params if directly loggin in
    this.activatedRoute.queryParams.subscribe((res)=>{
      if(JSON.parse(res.value) != null){
        // console.log(JSON.parse(res.value));
        // alert(JSON.stringify(res.value));
        this.isRegistering = JSON.parse(res.value);
        // alert(JSON.parse(res.value[0][1]));
      }
    });
    
   }

  ngOnInit() {
    this.showRegisteringForm = "";
    //find if the logged in user has rights to right or just read i.e this.isRegistering['name'] = true means has rights to write
    if(this.isRegistering['dashboardPage'] != '/patients'){
      // alert(this.isRegistering['name']);
     this.showRegisteringForm = this.isRegistering['name'];
     }
  }

  // the below functions pass queryparams which will enable only reading of information and not writting in the registration forms
  showHospitals(){
    this.isRegistering['dashboardPage'] = "/menu";
    // alert(this.isRegistering)
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
    this.isRegistering['dashboardPage'] = "/menu";
    this.router.navigate(['/pharmaceuticals'],{
      queryParams: {
        value : JSON.stringify(this.isRegistering || null)
       },
      });
  }

  showDoctors(){
    this.isRegistering['dashboardPage'] = "/menu";
    this.router.navigate(['/doctors'],{
      queryParams: {
        value : JSON.stringify(this.isRegistering || null)
       },
      });
  }

  showSecondopinionfacility(){
    this.isRegistering['dashboardPage'] = "/menu";
    this.router.navigate(['/secondopinionfacility'],{
      queryParams: {
        value : JSON.stringify(this.isRegistering || null)
       },
      });
  }
}
