import { Component, OnInit } from '@angular/core'
import { from } from 'rxjs'
import { AuthenticationService} from '../../Services/authentication.service'
import { Router } from '@angular/router'
import { ValidationService } from 'src/app/Services/validation.service'
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  firstName: string
  lastName: string
  email: string
  password: string
  role:string

  constructor(public auth: AuthenticationService , private router: Router, private val:ValidationService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    const credentials= {
      firstName: this.firstName,
      lastName: this.lastName,
      email:this.email,      
      password:this.password,
      role: 'Client'
    }



    if(!this.val.validatingRegister(credentials)){
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

    if(!this.val.validatingPassword(credentials.password)){
      this.toastr.error("*** 6-10 characters should be in your password ***","",{
        timeOut: 3000,
        positionClass: 'toast-top-full-width',
         
      });
      return false
    }

    this.auth.register(credentials).subscribe(user=> {
      if(user.success){
        this.router.navigateByUrl('/')
        this.toastr.success("registered successfully ","",{
          timeOut: 2000,
          // positionClass: 'toast-top-full-width'
        });
        // alert('registered successfully')
      }else{
        // this.flash.show(user.message, {cssClass:'alert-danger',timeout:3000})
        this.toastr.error(user.message,"",{
          timeOut: 2000,
          
        });
        console.log(user.message)
      }
    })
  }

}
