import { Component } from '@angular/core';
import {LocationModel} from './model/location-model';
import { Observable } from 'rxjs';
import { LocationService } from './services/location.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }
 
  ngOnInit() {
  
  }

  
}


