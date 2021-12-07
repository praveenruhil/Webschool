import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.component.html',
  styleUrls: ['./profilepic.component.css']
})
export class ProfilepicComponent implements OnInit {
  selectedFile: File
  name: String
  constructor(public dialogRef: MatDialogRef<ProfilepicComponent>) { }

  ngOnInit(): void {
  }
 
 onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    if(this.selectedFile != null)
    {
      this.name=this.selectedFile.name;
    }
    //console.log(this.selectedFile.name);
  }

  onUpload() {
    // upload code goes here
    
  }
}
