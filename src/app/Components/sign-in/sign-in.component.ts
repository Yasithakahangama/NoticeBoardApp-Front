import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'
import { from } from 'rxjs'
import { AuthenticationService  } from '../../Services/authentication.service'

import { ValidationService } from 'src/app/Services/validation.service'

import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string
  password: string

  constructor(private val:ValidationService,public auth: AuthenticationService , private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    const credentials = {
      email:this.email,
      password:this.password
    }    

    if(!this.val.validatingLogin(credentials)){
      console.log('fill all')
      this.toastr.error("*** Please fill all the fields ***","",{
        timeOut: 3000,
        positionClass: 'toast-top-full-width',         
      });

      return false
    }
    if(!this.val.validatingEmail(credentials.email)){
      console.log('invalid email')
      this.toastr.error("*** Please enter valid Email address ***","",{
        timeOut: 3000,
        positionClass: 'toast-top-full-width',
         
      });
      
      return false
    }

    console.log(this.email+' & '+this.password)

    this.auth.login(credentials).subscribe(user =>{
      if(user.success){
        this.router.navigateByUrl('/Notices')
        console.log(user.message)
      }
      else{
        this.toastr.error("*** Please check your password again ***","",{
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        console.log(user.message)
      }
    })

    
  }

}
