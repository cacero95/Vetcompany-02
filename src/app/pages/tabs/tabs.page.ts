import { Component, OnInit } from '@angular/core';
import { DbaService } from '../dba.service';
import { User } from '../user-model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user = {} as User;
  constructor(private dba:DbaService) {
    this.user = this.dba.getUser();
  }

  ngOnInit() {
  }

}
