import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Integer } from 'aws-sdk/clients/apigateway';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  selectedCars: any[];
  public lambda_student_add= environment.lambda_student_add;
  public lambda_teacher_add= environment.lambda_teacher_add;

  constructor(public common:CommonService,public httpClient:HttpClient) 
  { }

  ngOnInit(): void {
    console.log();
  }

  addStudent(fname,lname,email,parentid,pemail): void 
  {

    var courses="";
    this.selectedCars.forEach(function (value) {
      courses=courses+"&courses="+value;
    }); 

    const student_url= this.lambda_student_add+"?student_id="+fname+"&student_name="+fname+"&parent_id="+parentid+
    "&parent_name="+parentid+courses+"&due_fee=4000";
   
    console.log(student_url);

    this.httpClient.get(student_url,{responseType:'json'}).subscribe((data)=>{
      alert("Student added successfully");

    });;

    this.common.createUserInCognito(fname,email);
    this.common.createUserInCognito(parentid,pemail);

  }

  
}
