import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(public common:CommonService,public httpClient:HttpClient) { }
  selectedCars: any[];
  public lambda_teacher_add= environment.lambda_teacher_add;

  ngOnInit(): void {
  }
  addTeacher(tname,email): void {

    var courses="";
    this.selectedCars.forEach(function (value) {
      courses=courses+"&courses="+value;
    }); 

    const teacher_url= this.lambda_teacher_add+"?teacher_id="+tname+"&teacher_name="+tname+courses;
    console.log(teacher_url);
    this.httpClient.get(teacher_url,{responseType:'json'}).subscribe((data)=>{
      alert("Teacher added successfully");

    });;
    this.common.createUserInCognito(tname,email);
  }
}
