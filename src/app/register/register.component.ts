import { Component, OnInit } from '@angular/core';
import  { AuthService } from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  error

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/login'])
        },
        err => {
          console.log(err)

          if (err.error.message.message)
          {
            this.error = err.error.message.message
          }
          else if ( err.error.message )
          {
            this.error = err.error.message
          }

        }
      );
  }
}
