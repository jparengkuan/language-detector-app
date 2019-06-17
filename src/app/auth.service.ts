import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import  { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:8080/user/register";
  private _loginUrl = "http://localhost:8080/user/login";
  private _userDetails = "http://localhost:8080/user/details";
  private _userEntries = "http://localhost:8080/entrie/user";
  private _userUpdatePassword = "http://localhost:8080/user/update/password"
  private _userUpdateName = "http://localhost:8080/user/update/name"

  constructor(private http: HttpClient, private _router: Router) { }

  updateUserPassword(newPassword)
  {
    return this.http.put<any>(this._userUpdatePassword, {password: newPassword})
  }

  updateUserName(newName)
  {
    return this.http.put<any>(this._userUpdateName, {name: newName})
  }

  getUserDetails()
  {
    return this.http.get<any>(this._userDetails)
  }

  getUserEntries()
  {
    return this.http.get<any>(this._userEntries)
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
