import { Injectable } from '@angular/core';
import { ViewChild ,ElementRef} from '@angular/core';
//import { GeoHome ,GeoHomeOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import {Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class HospitalmapService {

  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  //Array to hold the nearby places:
  places : Array<any> ; 
  toReturn:Array<any>;

  constructor(
    public navCtrl: NavController,private geolocation : Geolocation
  ) { }

   getUserPosition(x):Promise<any>{
      
      this.options = {
      enableHighAccuracy : false
      };
      
        
     this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
          this.currentPos = pos;     

          console.log(pos);
          let latlng = pos.coords.latitude + "," + pos.coords.longitude;
          // alert(latlng);
          let message = "Current Position";
          this.toReturn[0] =  this.addMap(latlng,message);
          
          // alert(JSON.stringify(toReturn));
        },(err : PositionError)=>{
          console.log("error : " + err.message);
        
      });
     alert(this.toReturn[0]);
    return this.toReturn[0];
      // alert(JSON.stringify(toReturn));
     
       
          
// alert(JSON.stringify(this.addMap(latlng,message)));
         
        
        //  this.returnThis(toReturn);
     
   
     
  }
     returnThis(toReturn){
      //  alert(toReturn);
        return toReturn;

      }
      sample(){
      //  alert(toReturn);
        return "toReturn";

      }
  //to add a amrker
  // addMarker(){

  //   let marker = new google.maps.Marker({
  //   map: this.map,
  //   animation: google.maps.Animation.DROP,
  //   position: this.map.getCenter()
  //   });

  //   let content = "<p>This is your current position !</p>";          
  //   let infoWindow = new google.maps.InfoWindow({
  //   content: content
  //   });

  //   google.maps.event.addListener(marker, 'click', () => {
  //   infoWindow.open(this.map, marker);
  //   });

  // }

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

   
    //change center to be this hospital
    //this.moveToLocation(location1[0],location1[1]);

  }

  moveToLocation(latlng){
      let location1 = latlng.split(",");
      let lat = location1[0]
      let lng = location1[1];
       var center = new google.maps.LatLng(lat, lng);
       return center;
      // using global variable:

      // return this.map.panTo(center);
  }
  //get the list of nearby restaurants
  // getRestaurants(latLng)
  // {
  //   var service = new google.maps.places.PlacesService(this.map);
  //   let request = {
  //       location : latLng,
  //       radius : 8047 ,
  //       types: ["restaurant"]
  //   };
  //   return new Promise((resolve,reject)=>{
  //       service.nearbySearch(request,function(results,status){
  //           if(status === google.maps.places.PlacesServiceStatus.OK)
  //           {
  //               resolve(results);    
  //               // alert(JSON.stringify(results));
  //           }else
  //           {
  //               reject(status);
  //           }

  //       }); 
  //   });

  // }
  //This method creates a marker from a place. It's called for every place returned by the nearbySearch() method.
  createMarker(locations)
  {
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: locations
    });   
  }  
  //invokes the previous methods and create the map
  addMap(latlng, message){
    let location1 = latlng.split(",");
    let lat = location1[0]
    let long = location1[1];

    let location = {"lat":location1[0],"lng":location1[1]};

    let latLng = new google.maps.LatLng(lat, long);
    // alert(latLng);
    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    //this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

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
    let toReturn = {"mapOptions":mapOptions};
    return toReturn;

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

// }

}
