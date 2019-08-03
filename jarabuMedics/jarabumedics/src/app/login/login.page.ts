import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../authenticate.service';
import { CrudService } from '../crud.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  validations_form: FormGroup;
  errorMessage: string = '';
  users: any;
  usersEmail: string;
  usersCategory: string[] = [];
  dashboard:string[] = ['/hospital','/patients','/pharmaceuticals','/doctors','/secondopinionfacility'];  
  readCategory:string[] = ['facility','patient','pharmaceutical','doctor','secondOpinionFacility'];  
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
 
  ) { }
 
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
 
 
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      //check from users collection the category of the email logged in to know where to redirect to.
      this.authService.read_Users().subscribe(data => {
 
        this.users = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Email: e.payload.doc.data()['email'],
            Category: e.payload.doc.data()['category']
          };
        })
        console.log(this.users);
        //get category where email is the signed in email
        for(let user in this.users){
          if(this.users[user].Email == value.email){
            this.usersCategory[0] = this.users[user].Category;
          }
        }
//open the respective dashboard dynamically
        for(let x = 0; x<this.readCategory.length; x++){
            if(this.usersCategory[0] == this.readCategory[x]){
              alert(this.usersCategory[0]);
              alert(this.dashboard[x]);
              this.navCtrl.navigateForward(this.dashboard[x]);
            }
        }
   
      });
      //this.navCtrl.navigateForward('/hospital');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }
 
}
