import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { CrudService } from '../crud.service';
import { HospitalmapService } from '../hospitalmap.service';
import { MenuController, Platform } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar/ngx';
import { SplashScreen } from '../../../node_modules/@ionic-native/splash-screen/ngx';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
//import { GeoHome ,GeoHomeOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import {Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.page.html',
  styleUrls: ['./hospitals.page.scss'],
})
export class HospitalsPage implements OnInit {
  rootPage:any = LoginPage;
  hospitals: any;
  hospitalName: string;
  hospitalContact: number;
  hospitalAddress: string;
  hospitalLocation: string;
  b:number = 2;
  isRegistering;
  showRegisteringForm;
  //map
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapOptions: any;
  options : GeolocationOptions;
  currentPos : Geoposition;
  //Array to hold the nearby places:
  places : Array<any> ; 

  constructor(
    private crudService: CrudService,
    private menu: MenuController,
    public activatedRoute: ActivatedRoute,
    public hospitalMap: HospitalmapService,
    private geolocation : Geolocation,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen
  ) { 
     
   // get the query params if it comes from registering or else set query params if directly loggin in
    this.activatedRoute.queryParams.subscribe((res)=>{
      if(JSON.parse(res.value) != null){
        // console.log(JSON.parse(res.value));
        this.isRegistering = JSON.parse(res.value);
        // alert(JSON.parse(res.value[0][1]));
      }
    });

    this.menu.enable(true, 'menu');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
 
  ngOnInit() {
    this.showRegisteringForm = "";
   //find if the logged in user has rights to right or just read i.e this.isRegistering['name'] = true means has rights to write
   if(this.isRegistering['dashboardPage'] != '/patients'){
    this.showRegisteringForm = this.isRegistering['name'];
    }
  // alert(this.showRegisteringForm);
    this.crudService.read_Hospital(this.b).subscribe(data => {
 
      this.hospitals = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Contact: e.payload.doc.data()['Contact'],
          Address: e.payload.doc.data()['Address'],
          Location: e.payload.doc.data()['Location'],
        };
      })
      // console.log(this.hospitals);
 
    });
    //show map
    this.getUserPosition();
  }
  ngAfterViewInit() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.hospitalName;
    record['Contact'] = this.hospitalContact;
    record['Address'] = this.hospitalAddress;
    record['Location'] = this.hospitalLocation;

    this.crudService.create_NewHospital(record,this.b).then(resp => {
      this.hospitalName = "";
      this.hospitalContact = undefined;
      this.hospitalAddress = "";
      this.hospitalLocation= "";
      // console.log(resp);
    })
      .catch(error => {
        // console.log(error);
      });
  }

  addThisMarker(){
    this.hospitalMap.addMap(this.hospitalLocation,this.hospitalName);

  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_Hospital(rowID,this.b);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditContact = record.Contact;
    record.EditAddress = record.Address;
    record.EditLocation = record.Location;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Contact'] = recordRow.EditContact;
    record['Address'] = recordRow.EditAddress;
    record['Location'] = recordRow.EditLocation 
    this.crudService.update_Hospital(recordRow.id, record,this.b);
    recordRow.isEdit = false;
  }

  //map
  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     

        console.log(pos);
        let latlng = pos.coords.latitude+","+pos.coords.longitude;
        let message = "";
        this.addMap(latlng,message);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
}
//to add a marker
addMarker(latlng, message){
  let location1 = latlng.split(",");
  let location = {"lat":location1[0],"lng":location1[1]};

  let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: location
  });  

  let content = "<p>"+message+"</p>";          
  let infoWindow = new google.maps.InfoWindow({
  content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
  infoWindow.open(this.map, marker);
  });
  this.showHospital(latlng);

}

showHospital(latlng){
let location1 = latlng.split(",");

  //change center to be this hospital
  this.moveToLocation(location1[0],location1[1]);

}

moveToLocation(lat, lng){
    var center = new google.maps.LatLng(lat, lng);
    // using global variable:
    this.map.panTo(center);
}
//get the list of nearby restaurants
getRestaurants(latLng)
{
  var service = new google.maps.places.PlacesService(this.map);
  let request = {
      location : latLng,
      radius : 8047 ,
      types: ["restaurant"]
  };
  return new Promise((resolve,reject)=>{
      service.nearbySearch(request,function(results,status){
          if(status === google.maps.places.PlacesServiceStatus.OK)
          {
              resolve(results);    
              // alert(JSON.stringify(results));
          }else
          {
              reject(status);
          }

      }); 
  });

}
//This method creates a marker from a place. It's called for every place returned by the nearbySearch() method.
createMarker(location)
{
  let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: location
  });   
}  
//invokes the previous methods and create the map
addMap(latlng, message){
  let location1 = latlng.split(",");
  let lat = location1[0]
  let long = location1[1];

  let location = {"lat":location1[0],"lng":location1[1]};

  let latLng = new google.maps.LatLng(lat, long);
  let mapOptions = {
  center: latLng,
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  // this.getRestaurants(latLng).then((results : Array<any>)=>{
  //     this.places = results;
  //     // console.log(JSON.stringify(results));
  //     for(let i = 0 ;i < results.length ; i++)
  //     {
  //         this.createMarker(results[i]);
  //     }
  // },(status)=>console.log(status));

  this.createMarker(location);
  this.addMarker(latlng, message);

}
 
 
}

