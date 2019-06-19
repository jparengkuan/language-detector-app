import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {



  userDetails = {}
  userEntries = {}


  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage: string;
  errorMessage: string;

  newPassword;
  newName;

  newText;


  interval;

  constructor(private _authService: AuthService) {}

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
          this.userEntries= res.userEntries
        },
        err => console.log(err)
      )
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

  refreshData() {
    this.getUserEntries()
    this.getUserDetails()

  }


  ngOnInit() {

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errorMessage = null);


    this.refreshData()

    //Set interval so information is updated realtime
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000)
  }


  newEntrie() {

  }
}
