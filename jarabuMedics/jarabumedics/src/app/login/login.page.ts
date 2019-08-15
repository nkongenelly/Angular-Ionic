import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../authenticate.service';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
 
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
  dashboard:string[] = ['/menu','/patients'];  
  readCategory:string[] = ['Admin','patient'];  
  isRegistering ={name:false};

  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public router: Router,
    
 
  ) {}
 
  ngOnInit() {
    //get if one is registering to get the passed data or if loggin in, then define that the user should see the form to add 
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
        //check whether i is admin who has logged in or just patient
        if(this.usersCategory[0] == "Admin"){
          this.isRegistering['name'] = true; //this variable will be used to redirect to the admin only registration pages
          // alert('true');
        }
        else{
          this.isRegistering['name'] = false;
          // alert('false');
        }
//open the respective dashboard dynamically
        for(let x = 0; x<this.readCategory.length; x++){
            if(this.usersCategory[0] == this.readCategory[x]){
              this.isRegistering['dashboardPage'] = this.dashboard[x];
              this.router.navigate([this.dashboard[x]],{
                queryParams: {
                  value : JSON.stringify(this.isRegistering || null)
                 },
                });
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
