import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { from } from 'rxjs'

import { NoticesService } from 'src/app/Services/notices.service'
import { ValidationService } from 'src/app/Services/validation.service'

import { ToastrService } from 'ngx-toastr'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NoticeDetails } from 'src/app/Modals/NoticeModal'
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {
  noticeHeading: string
  noticeBody: string
  today = new Date();
  publishedDate: string = this.today.toLocaleDateString()
  addedBy: string = this.auth.getUserDetails()?.firstName + " "+ this.auth.getUserDetails()?.lastName

  constructor(private noti: NoticesService, private val: ValidationService, private toastr: ToastrService, public router: Router, public auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('userToken'); 
    this.router.navigateByUrl('/');
    this.toastr.info("Good Bye ","",{
      timeOut: 2000,
    });
  }

  addNotice(){
    const noticeData = {
      noticeHeading: this.noticeHeading,
      noticeBody: this.noticeBody,
      publishedDate: this.publishedDate,
      addedBy: this.addedBy
    }

    console.log(noticeData);

    if(!this.val.validatingNotice(noticeData)){
      console.log('fill all')
      this.toastr.error("*** Please fill all the fields ***","",{
        timeOut: 3000,
        positionClass: 'toast-top-full-width',
         
      });
      return false
    }
    
    Swal.fire({
      title: 'Are you sure want to add this notice?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Save it!',
      cancelButtonText: 'No, Cancel it'
    }).then((result) => {
      if (result.value) {
        //console.log(noticeData)
        Swal.fire(
          'Added Successfully',
          'Your Notice has been added',
          'success'
        )
        this.noti.addNotice(noticeData).subscribe(notice => {
          if(notice.success){
            this.router.navigateByUrl('/Notices')
          } else {
            this.toastr.error("*** Something went wrong ***","",{
              timeOut: 3000,
              positionClass: 'toast-top-full-width'
            });
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Notice is not saved',
          'error'
        )
      }
    })
  }


}
