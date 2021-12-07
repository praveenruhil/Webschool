import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}
 
  public lambda_notice_add= environment.lambda_notice_add;
 
  ngOnInit(): void {
  }

 addNotice(title,content,expiry_date): void {
  
  this.httpClient.get(this.lambda_notice_add+"?&content="+content+"&title="+title+"&expiry_date="+expiry_date,{responseType:'json'}).subscribe((data)=>{
  console.log(data);
  });

}
}
