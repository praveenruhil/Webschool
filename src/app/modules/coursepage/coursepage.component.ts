import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SubmissionComponent } from '../submission/submission.component';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css']
})
export class CoursepageComponent implements OnInit {

  id;
  sub;
  public role="";
  submit;

public lambda_course_assign_url =environment.lambda_course_assign_url
public lambda_submission_list_url =environment.lambda_submission_list_url


 assignment:any = [];
 submission:any =[];
  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router,private httpClient: HttpClient,public matDialog: MatDialog) {
      this.role=localStorage.getItem('role')

     }
    
  ngOnInit(): void {
    httpClient: HttpClient;

    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id'); 
       console.log(this.id);
       this.getSubmissionsList();
       this.getAssignmentList();
      
      // this.updateSubmission();
      
   });
  }
  
  public getSubmissionsList()
   {
    this.httpClient.get(this.lambda_submission_list_url+ localStorage.getItem('username'),{responseType:'json'}).subscribe((data)=>{
      if(data[this.id]!=null)
      { 
          for(let name in data[this.id])
          {
            this.submission.push(data[this.id][name]['Assignment_name'])
          }
      }
      console.log(this.submission)
      });
  }
  public getAssignmentList()
   {
      this.httpClient.get(this.lambda_course_assign_url+this.id,{responseType:'json'}).subscribe((data)=>{
       console.log(data);
       for (let index in data) {
            if((this.submission).indexOf(data[index]['Assignment_name'])!=-1)
              this.submit="Submitted"
            else
              this.submit="Submission Due"  
          this.assignment.push({due_date: data[index]['due_date'],url:data[index]['url'],Assignment_name: data[index]['Assignment_name'],status: this.submit});

       }
       console.log(this.assignment);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  onBack(): void {
     this._router.navigate(['course']);
  }

  openModal(Assignment_name) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
   // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      id: this.id,
      Assignment_name: Assignment_name,
  };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(SubmissionComponent, dialogConfig);
  }
}
