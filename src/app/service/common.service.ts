import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { env } from 'process';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

 /*  s3=new AWS.S3({
    accessKeyId: environment.accessKeyId,
    secretAccessKey: environment.secretAccessKey,
    region:environment.region
  }); */

   s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: environment.bucket_name}
  });

  //s3=new AWS.S3();

  /*dynamo=new AWS.DynamoDB(
    { 
     accessKeyId: environment.accessKeyId,
     secretAccessKey: environment.secretAccessKey,
     region:environment.region
    });*/
   // public docClient:any
    
    public subjectArray: any = {
      M1: 'Mathematics_1',
      M2: 'Mathematics_2',
      M3: 'Mathematics_3',
  
      C1: 'Computers_1',
      C2: 'Computers_2',
      C3: 'Computers_3',
  
      H1: 'History_1',
      H2: 'History_2',
      H3: 'History_3',
  
      S1: 'Science_1',
      S2: 'Science_2',
      S3: 'Science_3',
  
  }
  
  constructor() {
   /* AWS.config.update({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region:environment.region
    });*/
    
    var identityId=localStorage.getItem('jwt');
    //console.log("identity id"+identityId);

    AWS.config.update({
      region: environment.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: environment.identitypoolid,
        Logins:{
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_EpnRlUNBe': identityId
        }
      })
    });
   // this.docClient = new AWS.DynamoDB.DocumentClient({region:environment.region});   
   }

   createUserInCognito(username,email)
   {
   /* AWS.config.update({
      accessKeyId: environment.sh_accessKeyId,
      secretAccessKey: environment.sh_secretAccessKey,
      region:environment.region});*/

    const COGNITO_CLIENT = new AWS.CognitoIdentityServiceProvider({
        apiVersion: "2016-04-19",
        region: environment.region
      });
      
    var poolData = {
          UserPoolId: environment.userpoolid,
          Username: username,
          DesiredDeliveryMediums: ["EMAIL"],
          TemporaryPassword: environment.temp_password,
          UserAttributes: [
            {
              Name: "email",
              Value: email
            },
            {
              Name: "email_verified",
              Value: "true"
            }
          ]
        };
        console.log("creating teacher");
        COGNITO_CLIENT.adminCreateUser(poolData, (error, data) => {
        console.log(error);
        console.log(data);
        console.log(poolData);
        

    });
   }

  
}
