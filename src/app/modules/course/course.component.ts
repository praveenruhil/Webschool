import { Component, OnInit } from '@angular/core';
import { DataService} from '../../data.service';
import {HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public lambda_courses_url =environment.lambda_courses_url
  public course_string: string='';
  public username="";
  course_list:any = [];

  constructor(private httpClient: HttpClient,public common: CommonService) { 
    this.username=localStorage.getItem('username')
  }
  ngOnInit(): void {
    this.getCourses();
  }
  
  public getCourses()
  {
     this.httpClient.get(this.lambda_courses_url+this.username,{responseType:'json'}).subscribe((data)=>{
     this.course_string=data.toString();
     console.log(this.course_string);
     this.course_string.split(',').map(subject=>
        {
            this.course_list.push({key:subject,value: this.common.subjectArray[subject]});
            console.log("courselist new "+ this.course_list);
        });
     });
     console.log("courselist new "+ this.course_list);
 }

}
