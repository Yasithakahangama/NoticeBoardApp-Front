import { Injectable } from '@angular/core'
import { from } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Observable , of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router' 

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  constructor(private http: HttpClient , private router: Router) { }

  showNotices():Observable<any> {
    console.log("vvvvvvvvvvvv")
    return this.http.get('http://localhost:3000/notices/getNotices')
  }

  addNotice(noticeData:any):Observable<any>{
    return  this.http.post('http://localhost:3000/notices/post-Notice',noticeData)
  }

  deleteNotice(notice_Id:any):Observable<any> {
    console.log(notice_Id+"ssssssssss")
    return this.http.delete('http://localhost:3000/notices/delete-Notice/'+notice_Id)
  }
}
