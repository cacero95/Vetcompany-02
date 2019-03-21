import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DbaService } from './pages/dba.service';
import { User } from './pages/user-model';
import { Router } from '@angular/router';
import { UserTypePage } from './pages/user-type/user-type.page';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appMenu = [

    {title: 'login', url: '/login', icon: 'md-contact'},
    {title: 'registrarse', url:'/register', icon:'md-arrow-round-up'},
    {title: 'mapa', url:'/map', icon:'moon'}
  ];
  user:User;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dba:DbaService,
    private router:Router,
    private modalCtrl:ModalController,
    private menu:MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async navegar(pagina){

    if (pagina == ''){
      this.dba.setUser(null);
      this.appMenu = [

        {title: 'login', url: '/login', icon: 'md-contact'},
        {title: 'registrarse', url:'/register', icon:'md-arrow-round-up'},
        {title: 'mapa', url:'/map', icon:'moon'}
      ];
      this.menu.close();
    }
    if (pagina == '/register'){
      let modal = await this.modalCtrl.create({
        component:UserTypePage
      });
      modal.present();
      const data:any = await modal.onDidDismiss();

      let tipo:string = data.data.result;


      this.dba.setType(tipo);
      this.router.navigate([`${pagina}`]);

    }
    else {
      this.router.navigate([`${pagina}`]);
    }
  }
  ionViewDidEnter(){
    console.log('entrando');
    
  }
  ngDoCheck(){
    if (!this.user){
      this.user = this.dba.getUser();
      if (this.user){
        this.appMenu = [


          {title: 'mapa', url:'/map', icon:'moon'},
          {title: 'salir', url:'', icon:'md-log-out'}
        ];
      }
    }
  }
}
