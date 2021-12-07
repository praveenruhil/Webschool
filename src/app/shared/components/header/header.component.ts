import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService} from '../../../data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfilepicComponent } from '../../../modules/profilepic/profilepic.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username:string="";

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public dataService : DataService,public matDialog: MatDialog) {
   }

  ngOnInit() {
    this.username=localStorage.getItem('username');

   }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
 openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
   // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ProfilepicComponent, dialogConfig);
  }
  onLogoutClick() {
    //const URL="https://schoolweb.auth.us-east-1.amazoncognito.com/logout?client_id=25eulrabo38ta954clqned59qj&logout_uri=http://localhost:4200/";
    console.log("inside logout click");
    localStorage.clear();
    window.location.assign(environment.logout_url);
  }
  
  onLoginClick(){
    //const URL="https://schoolweb.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=25eulrabo38ta954clqned59qj&redirect_uri=http://localhost:4200/user";
    console.log("inside login click");
    //this._router.navigateByUrl("/user");
    window.location.assign(environment.login_url);

  }
  

}
