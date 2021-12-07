import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Base Api :' + environment.accessKeyId +
            ' production? ' +  environment.secretAccessKey +
            ' env: ' + environment.production);
  }

}
