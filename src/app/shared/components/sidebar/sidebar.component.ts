import { Component, OnInit } from '@angular/core';
import { DataService} from '../../../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public username:string="";
  public role:string="";
  public email:string="";

  constructor(public dataService : DataService) { 
    //console.log("username "+this.dataService.username);
    this.username=localStorage.getItem('username');
    this.role=localStorage.getItem('role');

    this.email=localStorage.getItem('email');

    
    //console.log("role "+this.dataService.role);
    //console.log("email "+this.dataService.email);
  }

  ngOnInit(): void {
  }

}
