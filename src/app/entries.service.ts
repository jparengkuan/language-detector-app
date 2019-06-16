import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  private _entriesUrl = "http://localhost:8080/entrie/"

  constructor(private http: HttpClient) { }

  getLatestEntries() {
    return this.http.get<any>(this._entriesUrl + 'latest')
  }
}
