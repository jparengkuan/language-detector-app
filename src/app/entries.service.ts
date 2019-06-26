import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  private _entriesUrl = "http://localhost:8080/entrie/"

  constructor(private http: HttpClient) { }

  postEntrie(text) {
    return this.http.post<any>(this._entriesUrl + 'new', {
      text: text
      });
  }

  getLatestEntries() {
    return this.http.get<any>(this._entriesUrl + 'latest')
  }
}
