import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilepicComponent } from './modules/profilepic/profilepic.component';
import { LandingComponent } from './modules/landing/landing.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { CourseComponent } from './modules/course/course.component';
import { CoursepageComponent } from './modules/coursepage/coursepage.component';
import { CreateAssignmentComponent } from './modules/create-assignment/create-assignment.component';
import { NoticeComponent } from './modules/notice/notice.component';
import { StudentComponent } from './modules/student/student.component';


import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubmissionComponent } from './modules/submission/submission.component';
import { TeacherComponent } from './modules/teacher/teacher.component';
import { HelpComponent } from './modules/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilepicComponent,
    LandingComponent,
    PaymentComponent,
    CourseComponent,
    CoursepageComponent,
    CreateAssignmentComponent,
    NoticeComponent,
    StudentComponent,
    SubmissionComponent,
    TeacherComponent,
    HelpComponent,
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
  //entryComponents: [ProfilepicComponent]
})
export class AppModule { }
