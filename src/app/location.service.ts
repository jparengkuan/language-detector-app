import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private _locationUrl = "https://nominatim.openstreetmap.org/reverse?format=jsonv2"

  constructor(private http: HttpClient) { }

  getLocationInfo(latitude, longitude) {
     return this.http.get<any>(this._locationUrl + '&lat=' + latitude + '&lon=' + longitude)
  }
}
