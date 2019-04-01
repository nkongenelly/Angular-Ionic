import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  projects: any[];
  constructor(db: AngularFireDatabase) { 
    db.list('/projects').valueChanges()
        .subscribe(projects => {
            this.projects = projects;
            console.log(this.projects);
        });
  }

  ngOnInit() {
  }

}
