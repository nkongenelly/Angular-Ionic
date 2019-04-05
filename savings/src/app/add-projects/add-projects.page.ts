import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { NavController} from '../../../node_modules/@ionic/angular';
import { SavingsService } from '../../services/savings.services';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.page.html',
  styleUrls: ['./add-projects.page.scss'],
})
export class AddProjectsPage implements OnInit {

  myProject = [];
  //projects: Map<string, Todo> = new Map();
  projects: any[];
  dates;

  ionViewWillEnter(){
   this.db.list('/projects').valueChanges().subscribe(projects => {
  //   projects.forEach(action => {
  //     const value = action.payload.val();
  //     const id = action.payload.key;
  //     this.projects.push(id, value);
  //   });

      this.projects = projects;
      console.log(this.projects);
      for(let project of projects){
        console.log(project);
      }
   });
}

// ngAfterViewChecked()
// {
//   console.log(Date.now());
//    this.dates = Date.now();
// }

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, private savingsService: SavingsService) { }

  ngOnInit() {
  }
  onAddProject(value:{projects: String,amount: Number,id?: Number,month: String}){
    this.db.list('/projects').push(value).then((item) => { 
      this.db.object('/projects/'+item.key).update({ id: item.key });
      console.log(item.key); 
  for(let one of this.projects ){
      console.log(one.key); 
  }
    });
    
    this.navCtrl.navigateBack('/projects');
  }

  

}
