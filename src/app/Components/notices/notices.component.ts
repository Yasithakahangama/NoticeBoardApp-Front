import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'
import { from } from 'rxjs'

import { NoticesService } from 'src/app/Services/notices.service'
import { AuthenticationService } from 'src/app/Services/authentication.service'

import { ToastrService } from 'ngx-toastr'
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  notices: any
  

  constructor(private noti: NoticesService, private toastr: ToastrService, public router: Router, public auth:AuthenticationService) { }

  ngOnInit(): void {
    this.noti.showNotices().subscribe(res => {
      this.notices = res
      console.log(this.notices);
    },
    err => {
      console.log(err)
    })

    console.log(this.auth.isAdmin())
  }

  deleteNotice(notiId:string, index:number){

    Swal.fire({
      title: 'Are you sure want to delete this notice?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, Cancel it'
    }).then((result) => {
      if (result.value) {
        //console.log(noticeData)        
        Swal.fire(
          'Deleted Successfully',
          'Your Notice has been deleted',
          'success'
        )
        this.noti.deleteNotice(notiId).subscribe(res => {
          console.log(res.message)
          this.notices.splice(index, 1);       
    
        })
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your notice is not deleted',
          'error'
        )
      }
    })

  }

  logout(){
    localStorage.removeItem('userToken'); 
    this.router.navigateByUrl('/');
    this.toastr.info("Good Bye ","",{
      timeOut: 2000,
    });
  }

}
