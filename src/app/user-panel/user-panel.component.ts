import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {



  userDetails = {}
  userEntries = {}

  updateError;
  updateSuccess;

  newPassword;
  newName;


  interval;

  constructor(private _authService: AuthService) {}

  userUpdatePassword() {
    this._authService.updateUserPassword(this.newPassword)
      .subscribe(
        res => {
          this.updateSuccess = res.message;
        },
        err => {
          this.updateError = err.error.message;
        }
      )
  }

  userUpdateName() {
    this._authService.updateUserName(this.newName)
      .subscribe(
        res => {
          this.updateSuccess = res.message;
        },
        err => {
          this.updateError = err.error.message;
        }
      )
  }


  getUserEntries()
  {
    this._authService.getUserEntries()
      .subscribe(
        res => {
          this.userEntries= res.userEntries
          console.log(this.userEntries)
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
    this.refreshData()

    //Set interval so information is updated realtime
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000)
  }




}
