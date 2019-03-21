import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DbaService } from '../dba.service';
import { Veterinaria } from '../user-model';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.page.html',
  styleUrls: ['./user-manage.page.scss'],
})
export class UserManagePage  {

  user:Veterinaria;
  servicio:string;
  contador:number = 0;
  constructor(private navparams:NavParams,
    private modalCtrl:ModalController,
    private dba:DbaService) {
    this.servicio = navparams.get('servicio');
    console.log(this.servicio);
  }

  ngOnInit() {
    this.user = this.dba.getUser();
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
