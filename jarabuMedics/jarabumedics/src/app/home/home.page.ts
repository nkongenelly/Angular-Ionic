import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
//import { GeoHome ,GeoHomeOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import {Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-Home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
})
export class HomePage {

  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  //Array to hold the nearby places:
  places : Array<any> ; 

  constructor(
    public navCtrl: NavController,private geolocation : Geolocation
  ) { }

  ngOnInit() {
     this.getUserPosition();
  }
  // ionViewDidEnter(){
  //   this.getUserPosition();
  // } 
  //method to display the map based on the current user position:
  getUserPosition(){
      this.options = {
      enableHighAccuracy : false
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

          this.currentPos = pos;     

          console.log(pos);
          this.addMap(pos.coords.latitude,pos.coords.longitude);

      },(err : PositionError)=>{
          console.log("error : " + err.message);
      ;
      })
  }
  //to add a amrker
  addMarker(){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

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
            }else
            {
                reject(status);
            }

        }); 
    });

  }
  //This method creates a marker from a place. It's called for every place returned by the nearbySearch() method.
  createMarker(place)
  {
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
    });   
  }  
  //invokes the previous methods and create the map
  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getRestaurants(latLng).then((results : Array<any>)=>{
        this.places = results;
        for(let i = 0 ;i < results.length ; i++)
        {
            this.createMarker(results[i]);
        }
    },(status)=>console.log(status));

    this.addMarker();

  }
  // showNearbyResto(){
  //   this.service = this.service || new google.maps.places.PlacesService(document.createElement('div'));
  //       let request = {
  //         location: new google.maps.LatLng(latitude, longitude),
  //         radius: '200',
  //       };
  //       return new Promise((resolve, reject) => {
  //           this.service.nearbySearch(request, function(results, status){
  //               console.log(status, results);
  //               if (status == google.maps.places.PlacesServiceStatus.OK) {
  //                   resolve(results.map(b => {
  //                       return results;
  //                   }));
  //               }else{
  //                   reject(results);
  //               }
  //           }
  //       });
      
  // }

}
