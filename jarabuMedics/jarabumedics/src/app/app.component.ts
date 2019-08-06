import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticateService } from './authenticate.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logoutPage(){
    this.authService.logoutUser();
    //close side menu then logout
    this.menuCtrl.close();
    this.navCtrl.navigateForward('');
  }
  logInPage(){
    //close sidemenu then go to log in page
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }
}
