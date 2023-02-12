import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { NoticesComponent } from './Components/notices/notices.component';
import { AddNoticeComponent } from './Components/add-notice/add-notice.component';

// Services
import { AuthenticationService } from './Services/authentication.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { NoticesService } from './Services/notices.service';
import { ValidationService } from './Services/validation.service';


const routes: Routes = [
  {path: "" , component:SignInComponent},
  {path: "SignUp" , component:SignUpComponent},
  {path: "Notices" , component:NoticesComponent , canActivate: [AuthGuardService]},
  {path: "AddNotice" , component:AddNoticeComponent , canActivate: [AuthGuardService]}
 
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NoticesComponent,
    AddNoticeComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule

  ],
  providers: [AuthenticationService, AuthGuardService, NoticesService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
