import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

declare var google; // este variable referencia todos los servicios de
// google maps

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map:any;
  @ViewChild('map')mapElement:ElementRef;
  constructor( private geolocation:Geolocation,
    private platform:Platform ) { }

    ngOnInit() {
      console.log('funciona los mapas');
      
      this.platform.ready().then(()=>{
        let mapOptions = {
          zoom:13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
        this.geolocation.getCurrentPosition().then((pos)=>{
          let latLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
          this.map.setCenter(latLng);
          this.map.setZoom(15);
        })
      })
    }
  
}
