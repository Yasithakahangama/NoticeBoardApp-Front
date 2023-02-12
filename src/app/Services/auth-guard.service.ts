import { Injectable } from '@angular/core'
import { from } from 'rxjs'
import { Router , CanActivate } from '@angular/router'
import { AuthenticationService } from '../Services/authentication.service'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  credentials:string
  userId:any

  constructor(private auth: AuthenticationService , private Router: Router , private toastr: ToastrService) { }

  canActivate() {
    if(!this.auth.isLoggedIn()) {
      this.Router.navigateByUrl('/');
      this.toastr.error("*** Please log into the system ***","",{
        timeOut:3000
      })
      return false
    }
    return true
  }
}
