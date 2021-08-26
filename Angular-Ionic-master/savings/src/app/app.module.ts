import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SavingsPage } from './savings/savings.page';
import { IncomePage } from './income/income.page';
import { ProjectsPage } from './projects/projects.page';
import { MonthlyPage } from './monthly/monthly.page';
import { OfferingPage } from './offering/offering.page';
import { SavingsService } from 'src/services/savings.services';
import { AngularFireModule } from 'angularfire2';
//import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseService } from '../services/firebase.services';


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SavingsService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
