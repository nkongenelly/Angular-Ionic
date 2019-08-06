import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { Router, NavigationExtras } from '../../../node_modules/@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-other-registrtaion',
  templateUrl: './other-registrtaion.page.html',
  styleUrls: ['./other-registrtaion.page.scss'],
})
export class OtherRegistrtaionPage implements OnInit {


  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isRegistering;
  
  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ],
   'category': [
    { type: 'required', message: 'Category is required.' }
  ]
 };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(){
    this.isRegistering = true;
    // alert(this.isRegistering)
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      category: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }


  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
      console.log("RES = "+JSON.stringify(value));
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
       
  //if there is no error in registration, then create a new user
     
     this.authService.createUser(value);
     }, err => {
      //alert(err.message);
       this.errorMessage = err.message;
       this.successMessage = "";
     })

  }

  goLoginPage(){
    // this.navCtrl.navigateBack('');
    //go to login page and pass parameter saying is registering so that only form appears and doesn't display the other hospitals
    this.router.navigate(['/login']);
  }


}
