import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { LocationModel } from '../model/location-model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public heading:string = 'Get Latitude Longitude';
  public latitude: number;
  public longitude: number;
  public city: string;
  public showLoader: boolean = false;
  public noResponse: boolean = false;

  public locationModel: LocationModel = new LocationModel();
  constructor(private locationService: LocationService) { }

  ngOnInit() {
  }

  // on button click to get lat long
  public getLatLng() {
    this.showLoader = true;
    let cityName = this.locationModel.city.toLowerCase();
    console.log(cityName);
    // if city in not present in localstorage
    if (localStorage.getItem(cityName) === null) {
      this.locationService.getLatLong(cityName).subscribe(
        (res) => {
          console.log(res);
          if (res.length < 1) {
            this.noResponseFound();
          }
          // if city is present in library
          else {
            this.latitude = res[0].geometry.location.lat;
            this.longitude = res[0].geometry.location.lng;
            this.setDataInLocalStorage(res, this.latitude, this.longitude, cityName);

          }

        }
      )
    }
    
    else {
      this.getDataFromLocalStorage(cityName);
    }
  }
  // if city is present in local storage
  public getDataFromLocalStorage(cityName) {
    console.log(localStorage.getItem(cityName))
    this.noResponse = false;
    let getItemStringifyData = localStorage.getItem(cityName);
    let parseData = JSON.parse(getItemStringifyData);
    this.latitude = parseData.lat;
    this.longitude = parseData.lng;
    this.showLoader = false;
  }
  // no record found
  public noResponseFound() {
    this.noResponse = true;
    this.showLoader = false;
  }
  // set data in local storage
  public setDataInLocalStorage(res, lat: number, lng: number, cityName: string) {
    let cordinates = {
      'lat': lat,
      'lng': lng
    }
    this.city = res[0].address_components[0].short_name.toLowerCase();
    localStorage.setItem(cityName, JSON.stringify(cordinates));
    this.noResponse = false;
    this.showLoader = false;
  }
}
