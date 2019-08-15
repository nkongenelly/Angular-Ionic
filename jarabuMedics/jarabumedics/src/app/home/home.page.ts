import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

declare var google;

@Component({
  selector: 'app-Home',
  templateUrl: './home.page.html',
  styleUrls: ['./Home.page.scss'],
})
export class HomePage {
    isRegistering:any = {};
 
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { 
    this.isRegistering['dashboardPage'] = "/menu";
    this.isRegistering['name'] = "false";
    
  }

  ngOnInit() {
      this.redirectToMenu();
  }

  redirectToMenu(){
    // alert(JSON.stringify(this.isRegistering));
    this.router.navigate(['/menu'],{
        queryParams: {
          value : JSON.stringify(this.isRegistering || null)
         },
        });
  }

}
