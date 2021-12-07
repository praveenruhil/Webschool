import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth ,Hub} from 'aws-amplify'
import * as AWS from 'aws-sdk';
import { env } from 'process';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


   constructor(public httpClient:HttpClient) { }
  notices:any = [];

  public lambda_notice_fetch= environment.lambda_notice_fetch;


  ngOnInit() {

    this.getNotices();
   
  }
  public getNotices()
  {
     this.httpClient.get(this.lambda_notice_fetch,{responseType:'json'}).subscribe((data)=>{
     
      for (let index in data['Items']) {
       this.notices.push({content: data['Items'][index]['content'],expiry_date:data['Items'][index]['expiry_date'],title: data['Items'][index]['title']});
    }
    console.log(this.notices);
     });
 }
}
