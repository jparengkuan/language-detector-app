import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {EntriesService} from '../entries.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {




  userDetails = {}
  userEntries = {}
  languageCount = {}
  langCountKey = []
  langCountVal = []

  langCountBool = 0;


  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage: string;
  errorMessage: string;

  newPassword;
  newName;

  newText;

  interval;

  //Geo location
  latitude;
  longitude;


  constructor(private _authService: AuthService, private _entrieService: EntriesService) {}

  addNewEntrie()
  {

    this._entrieService.postEntrie(this.newText, this.latitude, this.longitude)
      .subscribe(
        res => {
          console.log(res)
          this._success.next('language detected: ' + res.lang)
        },
        err => {
          this._error.next(err.error.message)
          console.log(err)
        }
      )
    this.update()
  }

  userUpdatePassword() {
    this._authService.updateUserPassword(this.newPassword)
      .subscribe(
        res => {
          this._success.next(res.message)
        },
        err => {
          this._error.next(err.error.message);
        }
      )
  }

  userUpdateName() {
    this._authService.updateUserName(this.newName)
      .subscribe(
        res => {
          this._success.next(res.message)
        },
        err => {
          this._error.next(err.error.message);
        }
      )
  }


  getUserEntries()
  {
    this._authService.getUserEntries()
      .subscribe(
        res => {
          this.userEntries= res.userEntries;
        },
        err => console.log(err)
      )
    console.log(this.userEntries)
  }

  getUserDetails()
  {
    this._authService.getUserDetails()
      .subscribe(
        res => {
          this.userDetails = res.user;
        },
        err => console.log(err)
      )

  }

  countUserDetails() {
    if(this.langCountBool < 2) {
      console.log('gottem')
      var entryCount = this.userEntries.length;
      for (let i = 0; i < entryCount; i++) {
        var lang = this.userEntries[i].result;

        if (lang in this.languageCount) {
          this.languageCount[lang]++;
        } else {
          this.languageCount[lang] = 1
        }
      }
    }
      this.langCountKey = Object.keys(this.languageCount)
      this.langCountVal = Object.values(this.languageCount)

      this.langCountBool++;
  }

  refreshData() {
    this.getUserEntries()
    this.getUserDetails()
    this.getLocation();
    this.countUserDetails();

  }
  update(){
    this.langCountBool = 0;
    this.languageCount = {};
    this.userEntries = {};

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            console.log ('Latitude: ' + this.latitude)
            console.log ('Longtitude: ' + this.latitude)
          }
        },
        (error: PositionError) => {
          console.log(error)

          this.latitude = 0;
          this.longitude = 0;

        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }




  ngOnInit() {

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(10000)
    ).subscribe(() => this.errorMessage = null);



    this.refreshData()

    //Set interval so information is updated realtime
    this.interval = setInterval(() => {
      this.refreshData();
    }, 1500)
  }


  newEntrie() {

  }
}





