import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationModel } from '../model/location-model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  map} from "rxjs/operators";
@Injectable({providedIn: 'root'})
export class LocationService {

// public error;
  constructor(private http: HttpClient) { }

public getLatLong(city){
let apiURL = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address='+city;
    return this.http.jsonp(apiURL, "callback").pipe(
      map(res => {
        let getReultsStrigyfy = JSON.stringify(res);
        let getReultsparse = JSON.parse(getReultsStrigyfy);
        //console.log(getReultsparse.results);
        return getReultsparse.results;
      }),
      catchError(this.error)
    );
  }
  public error = () =>{
    let error = "Something is wrong"
 return error;
   }
}
