import { Component, OnInit } from '@angular/core';
import { PetInfoService } from '../pet-info.service';
import { ModalController } from '@ionic/angular';
import { ViewFullPage } from '../view-full/view-full.page';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  tips:any[] = [];
  constructor(private pet:PetInfoService,
     private modalCtrl:ModalController) {
    this.pet.all_tips().subscribe((data:any)=>{
      
      this.tips = data.tips;
      
    });

    this.pet.twitter().subscribe(data=>{
      console.log(data);
    })

  }

  ngOnInit() {
  }
   async completo(item){
    this.pet.setTip(item);
    let modal = await this.modalCtrl.create({
      component: ViewFullPage
    });

    modal.present();
  }
}
