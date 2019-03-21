import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { DbaService } from '../dba.service';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { User, Veterinaria } from '../user-model';


// cualquiercosa12345

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario_normal:any;
  correo:string;
  password:string;
  items:any[] = [];
  
  constructor(private fireauth:AngularFireAuth,
     private alertCtrl:AlertController,
     private dba:DbaService,
     private router:Router) {}

  ngOnInit() {
  }
  async login(){
    let itinerario:any[] = [];
    console.log(this.correo, this.password);
    try{
      
      
      const result = this.fireauth.auth.signInWithEmailAndPassword(this.correo, this.password)
      // console.log(result);
      if(result){
        
        this.dba.consultar_usuario(this.correo)
        .pipe(map(valores=>{
          return valores.map(a => {
            const data = a.payload.val();
            const key = a.payload.key;
            return {key , data};
   
          });
        })).subscribe(info=>{
          this.items = info;
          
          let index = this.items.findIndex(idx => {
            
            if (idx.key == 'type'){
              return idx;
            }
          });
          
          
          if (this.items[index].data == "mascota"){
            this.normal_user(this.items);
          }
          else{
            this.institute_user(this.items);
          }  


          //itinerario = info;
          
          //this.muestrame(this.items);
          //console.log(this.items);
          //console.log(itinerario);
    
        });
        //console.log(this.items);
        
        
                
      }
      
      
    }
    catch (err){
      console.log(JSON.stringify(err));
      this.crearAlerta('error', JSON.stringify(err));
    }
    //console.log(itinerario);
    
  }
  probar(){
    console.log(this.dba.getUser());
    
    
  }

  institute_user(info){
    let vet = {} as Veterinaria;
    vet.type = 'institución';
    for (let vet_info of info){
      if(vet_info.key == 'correo'){
        vet.correo = vet_info.data;
      }
      else if (vet_info.key == 'direccion'){
        vet.direccion = vet_info.data;
      }
      else if (vet_info.key == 'funciones'){
        vet.funciones = vet_info.data;
      }
      else if (vet_info.key == 'name'){
        vet.name = vet_info.data;
      }
      else if (vet_info.key == 'telefono'){
        vet.telefono = vet_info.data;
      }
      
    }
    
    this.dba.setUser(vet); // actualizo el usuario en el current user
    this.router.navigate(['/tabs/home']);
  }
  normal_user(info){
    let user = {} as User;

    user.type = 'mascota';
    for (let user_info of info){
      if (user_info.key == 'apellido'){
        user.apellido = user_info.data;
      }
      else if (user_info.key == 'correo'){
        user.correo = user_info.data;
      }
      else if (user_info.key == 'mascotas'){
        user.mascotas = user_info.data;
      }
      else if (user_info.key == 'nMascotas'){
        user.nMascotas = user_info.data;
      }
      else if (user_info.key == 'name'){
        user.name = user_info.data;
      }
      
      
    }
    this.dba.setUser(user);
    this.router.navigate(['/tabs/home']);
  }
  
  async crearAlerta(titulo:string,mensaje:string){
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: mensaje,
      buttons:[
        {
          text: 'Ok',
          role: 'Ok',
          cssClass: 'primary'
        }
      ]
    });
    await alert.present();

  }


}
