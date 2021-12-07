import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Auth } from 'aws-amplify'
import Amplify, { API } from 'aws-amplify';
import { threadId } from 'worker_threads';
import { environment } from '../environments/environment';
import * as AWS from 'aws-sdk';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

public lambda_role_url =environment.lambda_role_url;
public username:string='';
public role:string='';
public email:string='';

  constructor(private httpClient: HttpClient) {
    this.getUsernameRole();
    this.getEmail();
    Auth.currentSession().then(ses=>{
        localStorage.setItem('jwt', ses.getIdToken().getJwtToken());
      });
 
}
   public getRole()
   {
      this.httpClient.get(this.lambda_role_url+this.username,{responseType:'json'}).subscribe((data)=>{
        const rr=data['role'];
        this.role=rr;
        localStorage.setItem('role', this.role);
      });
  }

  getUsernameRole()
  {
    return Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user =>{
     this.username=user.username;
     localStorage.setItem('username', this.username);

     this.getRole();
      
   })
    .catch(err => 
      console.log(err)
      );
  }

  getEmail()
  {
    Auth.currentUserInfo().then((userinfo)=>{
      if(userinfo!=null)
      {
         const { attributes = {} } = userinfo;
         this.email=attributes['email'];
         localStorage.setItem('email', this.email);
      }

    })
  }

}