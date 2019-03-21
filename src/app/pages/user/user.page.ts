import { Component, OnInit } from '@angular/core';
import { DbaService } from '../dba.service';
import { User } from '../user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user={} as User;
  profile_image:string = "";
  constructor(private dba:DbaService, private router:Router) {
    this.user = dba.getUser();
    this.profile_image = this.user.mascotas[0].url;
  }

  ngOnInit() {
  }
  close_session(){

    // console.log('esta func');
    
    this.dba.setUser(null);
    console.log(this.dba.getUser());
    
    //this.router.navigate(['/tabs/home']);
  }

}
