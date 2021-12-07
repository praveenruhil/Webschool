import { Component, OnInit } from '@angular/core';
import { DataService} from '../../data.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  
  sideBarOpen = true;
  constructor(public dataService : DataService) { }

  ngOnInit() {}

  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
