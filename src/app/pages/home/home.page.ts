import { Component, OnInit } from '@angular/core';
import { DbaService } from '../dba.service';

import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
// Social networks

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UserManagePage } from '../user-manage/user-manage.page';
import { ServiceManagePage } from '../service-manage/service-manage.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  
  
  img:string;
  user:any;
  url:'https://ionicacademy.com';
  constructor(private dba:DbaService,
    private alertCtrl:AlertController,
    private router:Router,
    private social:SocialSharing,
    private modalCtrl:ModalController) {

    this.img = 'assets/img/shalo_logo.png'

  }

  ngOnInit() {

  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('ngOnChanges');
  }


  ngAfterContentChecked() {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.user = this.dba.getUser();

    
    if (this.user){
      if(this.user.url){
        this.img = this.user.url;
      }
      
    }

    
  }
  /**
   * todavia funciona
   * 
   *  ionViewWillEnter (){
  //  console.log('cargando la pagina');

      }
    
      ionViewDidEnter(){
      //  console.log('entrando');
    
      }
 
   * 
   */
  
  map(){
    this.router.navigate(['/map']);
  }
  tips(){
    this.router.navigate(['/tips']);
  }
  log_out(){
    this.dba.setUser(null);
    this.user = null;

    this.alert_message('Salio', 'Correctamente');
  }
  async alert_message(titulo:string , mensaje:string){
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: mensaje,
      buttons:[
        {
          text: 'Ok',
          role: 'Ok',
          cssClass: 'primary',
          handler: ()=>{
            alert.dismiss();
          }
        }

      ]
    });
    await alert.present();
  }
  async face_shared(imagen:string){
    console.log(imagen);
    this.social.shareViaFacebook(null,imagen,this.url)
    .then(()=>{
      this.alert_message('Exito','Al postear')
    }).catch((data)=>{
      console.log(data);

      this.alert_message('Error :(', 'No se pudo postear');
    })

  }

  async twitter_shared(imagen:string){
    console.log(imagen);
    this.social.shareViaTwitter(null,imagen,this.url);
  }
  async whats_shared(imagen:string){
    console.log(imagen);
    this.social.shareViaWhatsApp('publicando desde ionic',imagen,this.url);

  }
  async shared(imagen:string){
    let alert = await this.alertCtrl.create({
      header:'Donde quieres',
      subHeader: 'publicar?',
      buttons:[
        {
          text:'Facebook',
          role:'Facebook',
          cssClass:'primary',
          handler: ()=>{
            this.face_shared(imagen);
          }
        },
        {
          text:'Twitter',
          role:'Twitter',
          cssClass:'secondary',
          handler: ()=>{
            this.twitter_shared(imagen);
          }

        },
        {
          text:'WhatApp',
          role:'WhatApp',
          cssClass:'secondary',
          handler: ()=>{
            this.whats_shared(imagen);
          }
        }

      ]
    });
    await alert.present();
  }
  async open(opcion:string){
    let dividir_opcion = opcion.split('_');
    if (dividir_opcion[1] == 'usuarios'){
      
      let modal = await this.modalCtrl.create({
        component:UserManagePage,
        componentProps:{
          servicio: dividir_opcion[0]
        }
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      console.log(data);
    }
    else{
      let modal = await this.modalCtrl.create({
        component:ServiceManagePage,
        componentProps:{
          servicio: dividir_opcion[0]
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      console.log(data);
    }
    
  }

}
