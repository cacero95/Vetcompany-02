import { Component, OnInit } from '@angular/core';
import { User, Mascota, Veterinaria } from '../user-model';
import { AlertController, ModalController } from '@ionic/angular';
import { MascotaPage } from '../mascota/mascota.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbaService } from '../dba.service';
import { Router } from '@angular/router';
import { RegistrarVetPage } from '../registrar-vet/registrar-vet.page';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  is_mascotas:boolean = false;
  pets:Mascota[] = [];
  user = {} as User;
  count:number;
  is_imagen:boolean = false;
  servicios:any[] = [];
  funciones:any[] = [];
  vet = {} as Veterinaria;
  cuenta = 0;
  password:string;

  constructor(private alertCtrl: AlertController,
    private modalCtrl:ModalController,
    private fireAuth:AngularFireAuth,
    private dba:DbaService,
    private router:Router,
    ) {
      this.user.type = dba.getType();
      console.log(this.user.type);

      if (this.user.type == 'veterinaria'){

        this.vet.funciones = [];

        this.servicios = [
          {
            nombre: 'Guarderia',
            img: 'assets/img/home.png'
        },
        {
            nombre: 'Peluqueria',
            img: 'assets/img/tijeras.png'
        },
        {
            nombre: 'Urgencias',
            img: 'assets/img/warning.jpg'
        },
        {
            nombre: 'Veterinaria',
            img: 'assets/img/veterinaria.png'
        },
        {
            nombre: 'Hotel mascotas',
            img: 'assets/img/hotel.png'
        },
        {
            nombre: 'Transporte mascotas',
            img: 'assets/img/warning.jpg'
        }
        ]
      }
      
    }

  ngOnInit() {
  }
  setServices(task:string){
    //this.vet.servicios.push(servicio);
    let pos = this.funciones.indexOf(task); 
    if (pos == -1){
      this.funciones.push(task);
    }
    else {
      this.funciones.splice(pos);
    }
    // console.log(this.funciones.length);
    
    
    
  }

  async ingresar_veterinaria(){

    
    let modal = await this.modalCtrl.create(
      {
        component: RegistrarVetPage
      }
    );
    modal.present();
    const { data } =  await modal.onDidDismiss();
    this.vet = data.result;
    this.vet.funciones = this.funciones;
    this.is_imagen = false;
    
    /**
     * Pregunta si el usuario va a subir una imagen al servidor
     */
    if (this.vet.url){
      this.is_imagen = true
    }
    
    try{
      const result = await this.fireAuth.auth
      .createUserWithEmailAndPassword(this.vet.correo,this.password);
      if(result){
        // si es verdadero entonces el usuario no existe
        // console.log(this.user.mascotas[0].url);
        this.user.type = 'institucion'
        this.dba.upload_veterinaria(this.is_imagen, this.vet);
        
        // despues vuelvo al home
        this.router.navigate(['/tabs/home']);
      }  
    }
    catch(err){
      console.log(JSON.stringify(err));
      this.mensaje_error(JSON.stringify(err));
      
    }
    
    
    

  }
  mascotas(){
    if (!this.is_mascotas){ // si es false significa que el usuario no ha registrado mascotas
      //this.crear_alert('Cuantas', 'Mascotas tienes?'); // de aqui saco el numero de mascotas
      // a registrar
      this.is_mascotas = true;
      //console.log('numero macotas:',this.user.nMascotas);
      this.crear_alert('Cuantas', 'Mascotas tienes?');
      
    }
    
  }
  async mensaje_error(mensaje:string){
    let alert = await this.alertCtrl.create({
      header:'error',
      subHeader:mensaje,
      buttons:[
        {
          text:'Ok',
          role: 'Ok'
        }
      ]
    })
    alert.present();
  }
  async register(){
    try{
      const result = await this.fireAuth.auth
      .createUserWithEmailAndPassword(this.user.correo,this.password);
      if(result){
        // si es verdadero entonces el usuario no existe
        // console.log(this.user.mascotas[0].url);
        this.user.type = 'mascota';
        this.dba.upload_imagen(this.is_imagen, this.user);
        
        // despues vuelvo al home
        this.router.navigate(['/tabs/home']);
      }  
    }
    catch(err){
      console.log(JSON.stringify(err));
      this.mensaje_error(JSON.stringify(err));
      
    }
  }
  async modal_create(){
    for (let x = 0; x < this.count; x++){
      let modal = await this.modalCtrl.create({
        component: MascotaPage
      })
      modal.present();
      let data = await modal.onDidDismiss();
      //console.log(data.data.mascota);
      if (data.data.mascota == "cancelo"){
        return; // si el usuario cancela entonces se cierra el metodo
      }
      this.pets.push(data.data.mascota);
      this.is_imagen = data.data.is_image;
      //console.log(this.pets)
    }
    this.user.mascotas = this.pets;
    
  }
  async crear_alert( titulo:string, mensaje:string ){
    const alert = await this.alertCtrl.create({
      header:titulo,
      subHeader:mensaje,
      inputs:[
        {
          name: 'n_mascotas',
          type:'number',
          min: 1
        }

      ],
      buttons:[
        {
          text: 'Ok',
          role: 'Ok',
          cssClass: 'primary',
          // numero mascotas del usuario en cuestion
          handler: cuenta =>{
            this.user.nMascotas = cuenta.n_mascotas;
            this.count = this.user.nMascotas; // le mando al contador el numero de mascotas de a persona 
            //console.log(this.count)
            
            this.modal_create();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
            console.log('no hay mascotas');
            
          }
        }
      ]
    });
    await alert.present();
  }
}
