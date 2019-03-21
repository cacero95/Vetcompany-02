import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { User, Veterinaria } from './user-model';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
// import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class DbaService {
  values:any[] = [];
  usuario:any;
  items:Observable<any[]>;
  tipo_usuario:string;
  tipo:string;
  constructor(private fireDba:AngularFireDatabase,
     private alertCtrl:AlertController) {
    
  }
  consultar_usuario (key:string){
    
    key = key.replace("@","_");
    while(key.indexOf(".") != -1){
      key = key.replace(".","_");
    }
    
    /*
    this.items = this.fireDba.list(`${key}/`).snapshotChanges().pipe(
      map(actions =>actions.map(a => ({key: a.key}))
      )
    )
  
    */
     this.items = this.fireDba.list(`${key}/`)
     .snapshotChanges()
     
     // console.log(this.items);
     
    return this.items;
  }
  setType(tipo){
    this.tipo = tipo
  }
  getType(){
    return this.tipo;
  }
  setUser(usuario){
    //mando el usuario que se loggeo
    
    if (usuario.type == 'normal'){
      this.usuario = usuario;
    }
    else{
      this.usuario = usuario;
    }
    
    
  }
 
  /**
   * Devuleve el usuario actual 
   */
  getUser(){
    return this.usuario;
  }
  
  
  upload_imagen(is_image:boolean,usuario:User){
    
    
    
    let key = usuario.correo
        key = key.replace("@","_");
        while(key.indexOf(".") != -1){
          key = key.replace(".","_");
        }

    // console.log(is_image);
    if (is_image){
     let promesa = new Promise ((resolve,reject)=>{
       // recorro el arreglo de mascotas que puede tener el usuario
       for (let x=0; x < usuario.mascotas.length; x++){
        let fireStorage = firebase.storage().ref(); // hacemos la referencia al storage en firebase
        let file_name = new Date().valueOf().toString();
        fireStorage.child(`img/${file_name}`)
        
        let upload_task: firebase.storage.UploadTask =
          fireStorage.child(`img/${file_name}`)
          .putString(usuario.mascotas[x].url, 'base64', {contentType: 'image/jpeg'}); // mando el url de la imagen
          upload_task.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{

          },
          (err)=>{

          },
          ()=>{ // exito
            
            let url:string;
            fireStorage.child(`img/${file_name}`).getDownloadURL().then((direction)=>{
              console.log('el url es ' + direction);
              usuario.mascotas[x].url = direction;
              //console.log("el url es:" + direction);
              this.show_alert(direction);
              // console.log('el usuario tiene la foto:'+usuario.mascotas[x].url);
              
              this.fireDba.object(`${key}/`).update(usuario);

              this.setUser(usuario);
            })

            
            
            //upload_task.snapshot.ref.getDownloadURL().then((downloadURL)=> {
              //console.log('File available at', downloadURL);
              
            //});
            
          }
          );
        }
        resolve();
        // aca subire los registros a firebase
        // despues de subir las imagenes al storage
       
     })
    }
    else{
      this.fireDba.object(`${key}/`).update(usuario);
      this.setUser(usuario);
    }
  }
  
  
  async show_alert(mensaje:string){
    let alert = await this.alertCtrl.create({
      header:'el url es',
      subHeader: mensaje,
      buttons:[
        {
          text:'Ok',
          role:'Ok'
        }
      ]
    });
    await alert.present();
  }

  upload_veterinaria (is_image:boolean, vet:Veterinaria){

    let key = vet.correo
        key = key.replace("@","_");
        while(key.indexOf(".") != -1){
          key = key.replace(".","_");
        }
    
    if (is_image){
      let promesa = new Promise ((resolve,reject)=>{
        
         let fireStorage = firebase.storage().ref(); // hacemos la referencia al storage en firebase
         let file_name = new Date().valueOf().toString();
         fireStorage.child(`img/${file_name}`)
         // creo una peticion para agregar imagenes al storage de google
         let upload_task: firebase.storage.UploadTask =
           fireStorage.child(`img/${file_name}`)
           .putString(vet.url, 'base64', {contentType: 'image/jpeg'}); // mando el url de la imagen
           upload_task.on( firebase.storage.TaskEvent.STATE_CHANGED,
           ()=>{
 
           },
           (err)=>{
 
           },
           ()=>{ // exito
             
             /**
              * descargo el url segun el storage de google para guardarselo en la 
              * data base
              */
             fireStorage.child(`img/${file_name}`).getDownloadURL().then((direction)=>{
               console.log('el url es ' + direction);
               vet.url = direction;
               //console.log("el url es:" + direction);
               this.show_alert(direction);
               console.log('el usuario tiene la foto:'+vet.url);
               
               this.fireDba.object(`${key}/`).update(vet);
               this.setUser(vet);
             });
 
             
             
             //upload_task.snapshot.ref.getDownloadURL().then((downloadURL)=> {
               //console.log('File available at', downloadURL);
               
             //});
             
           }
           );
         
         resolve();
         // aca subire los registros a firebase
         // despues de subir las imagenes al storage
        
      });
     }
     else{
       this.fireDba.object(`${key}/`).update(vet); 
       this.setUser(vet);
     }
        
  }
} 