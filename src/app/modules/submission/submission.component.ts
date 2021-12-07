import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as AWS from 'aws-sdk';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  public fileName;
  public file;
  public fileType;
  public name;
  public ext;
  public date;
  public course;
  public user;
  public url;
  public lamdba_url;
  accesskey: string;
  secretkey: string;
  public 

  constructor(public httpClient:HttpClient,public dialogRef: MatDialogRef<SubmissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public common:CommonService) 
    {
      this.course=this.data.id;
      this.name=this.data.Assignment_name;
      this.user= localStorage.getItem('username');
      console.log(this.data.id);
      console.log(this.data.Assignment_name)
   }

  ngOnInit(): void {
    
  }
  public onFileChange(event) {
    const reader = new FileReader();

    this.file=event.target.files[0];
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      this.fileType=event.target.files[0].type;
      this.ext = this.fileName.split('.').pop()
      if(this.fileType==null){
        this.fileType='txt'
      }
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      
    }

  }
  public onSubmit():void{
    const params = {
      Bucket: environment.bucket_name,
      Key: this.user+"/"+this.course+"/"+this.name+"."+this.ext, // File name you want to save as in S3
      Body: this.file,
      ACL: 'public-read',
      ContentType: this.fileType,
      ContentDisposition: 'Inline'
    };
    this.common.s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log("Solution submitted successfully. ",data.Location);
  });

  const pa = {
    Bucket: environment.bucket_name,
    Key: this.course+"/"+this.name+"_submissions/"+this.user+"."+this.ext, // File name you want to save as in S3
    Body: this.file,
    ACL: 'public-read',
    ContentType: this.fileType,
    ContentDisposition: 'Inline'
  };
  this.common.s3.upload(pa, function(err, data) {
    if (err) {
        throw err;
    }

    console.log("Solution submitted successfully to submissions. ",data.Location);
  });


  this.url=environment.s3_bucket_url+this.user+"/"+this.course+"/"+this.name+"."+this.ext;
  this.lamdba_url= environment.lambda_course_assign_url;
  this.httpClient.get(this.lamdba_url+'submit/'+this.user +"/"+this.course+'/'+this.name+"."+this.ext,{responseType:'json'}).subscribe((data)=>{
    console.log(data);
  });;
  this.dialogRef.close(); 

  return alert("Solution submitted!!");
  }

}
