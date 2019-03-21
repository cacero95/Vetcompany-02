import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.page.html',
  styleUrls: ['./user-type.page.scss'],
})
export class UserTypePage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  ingresar( type_user:string ){
    this.modalCtrl.dismiss({
      'result': type_user
    })
  }
}
