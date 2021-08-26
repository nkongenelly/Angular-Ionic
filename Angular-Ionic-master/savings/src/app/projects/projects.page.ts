import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, AlertController } from '../../../node_modules/@ionic/angular';
import { SavingsService } from '../../services/savings.services';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  projects: any[];
  myProject:{projects: String, any: Number, id?: any, month: String}[] = [];
  ;
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public alertCtrl: AlertController, private savingsService: SavingsService) { 
    db.list('/projects').valueChanges()
        .subscribe(projects => {
          
            this.projects = projects;
            console.log(projects);
            for(let project of projects){
              console.log(project);
            }
        });
        this.savingsService.allProjects(this.projects);
  }

  ngOnInit() {
  }
  buttonAddProjects (){
    this.navCtrl.navigateForward('/add-projects');
    
  }
  editProject(id){
    this.savingsService.allProjects(this.projects);
    this.savingsService.editMyProjects(id);
    // this.myProject = [];
    // this.myProject = this.projects[id];
    console.log('this'+this.myProject);
    this.navCtrl.navigateForward('/add-projects');
  }
  async deleteProject(i){
    let alert = await this.alertCtrl.create({
      header: 'Confirm delete user',
      message: 'Are you sure you want to permanently delete this item?',
      buttons: [
          {
              text: 'No',
              handler: () => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: 'Yes',
              handler: () => {
                console.log(i);
              this.db.list('/projects').remove(i);
              }
          }
      ]
  })
  
  
  await alert.present();
   
}

}
