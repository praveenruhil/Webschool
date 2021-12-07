import { Component, OnInit } from '@angular/core';
import * as AWS from "aws-sdk";
import { env, send } from 'process';
import { callbackify } from 'util';
import { ASTWithName } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  sub;
  private fileName;
  public fileType;
  public file;
  public name;
  public ext;
  public date;
  public course;
  public url;
  public lamdba_url;
  id;
 
public onName(event){
this.name=event;
}
public onDate(event){
  this.date=event;
  }
  constructor(private httpClient: HttpClient,private _Activatedroute:ActivatedRoute,
    private _router:Router,public common:CommonService) {
    httpClient: HttpClient;

    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id'); 
       console.log(this.id);
   });
  }
  ngOnInit(): void {
   
  }
 
  onBack(): void {
    this._router.navigate(['coursePage/'+this.id]);
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

  public onUpload():void{

    this.course=this.id;
    const params = {
      Bucket: environment.bucket_name,
      Key: this.course+"/"+this.name+"."+this.ext, // File name you want to save as in S3
      Body: this.file,
      ACL: 'public-read',
      ContentType: this.fileType,
      ContentDisposition: 'Inline'
    };
     console.log("file name is",this.name);
  
  //Uploading files to the bucket
    this.common.s3.upload(params, function(err, data) {
      if (err) {
          console.log(err);
          throw err;
      }
      else{
        console.log(data);
      }
      console.log(" File uploaded successfully. ",data.Location);
  });
  
  this.url=environment.s3_bucket_url+this.course+"/"+this.name+"."+this.ext;

  console.log("u is",this.url);
  console.log(this.name,this.date,this.url);     
  this.lamdba_url=environment.lambda_course_assign_url;
       
  this.httpClient.get(this.lamdba_url+this.course+'/'+this.name+"."+this.ext+'/'+this.date,{responseType:'json'}).subscribe((data)=>{
    console.log(data);
  });;
  this.onBack();
  return alert("Assingment is created");
   }
}
