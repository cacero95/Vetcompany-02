import { Component, OnInit } from '@angular/core';
import { PetInfoService } from '../pet-info.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-full',
  templateUrl: './view-full.page.html',
  styleUrls: ['./view-full.page.scss'],
})
export class ViewFullPage implements OnInit {
  tip:any;
  constructor(private pet:PetInfoService,
    private modalCtrl:ModalController) {
    this.tip = this.pet.getTip();
    // console.log(this.tip);
   }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
    
  }
}
