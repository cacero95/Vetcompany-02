import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Mascota } from '../user-model';

// servicios

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.page.html',
  styleUrls: ['./mascota.page.scss'],
})
export class MascotaPage implements OnInit {

  image64:string;
  mascota:Mascota;
  imagePreview:string = "";
  is_image:boolean = false;
  constructor(private modalCtrl:ModalController,
    private imagePicker: ImagePicker,
    private camera:Camera,
    private alertaCtrl:AlertController) { }

  ngOnInit() {
  }
  choose_photo(){

    const options:ImagePickerOptions = {
      quality: 70,
      outputType: 1, // indica que la imagen va ser en base 64bits
      maximumImagesCount:1
    };
    this.imagePicker.getPictures(options).then((results)=>{
      for (var i = 0; i < results.length; i++){
        this.imagePreview = 'data:image/jpeg;base64,' + results[i];
        this.image64 = results[i];
        this.is_image = true; // quiere decir que la imagen esta en la mascota
      }
    },(err)=>console.log(JSON.stringify(err)))
    
  }
  open_camera(){

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image64 = 'data:image/jpeg;base64,' + imageData;
      this.imagePreview = imageData;
      console.log(this.image64);
      console.log(this.imagePreview);
      this.is_image = true;
    }, (err) =>{
      this.crear_mensaje ('Error', JSON.stringify(err));
    })
  }
  async select_imagen(){
    let alert = await this.alertaCtrl.create(
      {
        header: 'Seleccione',
        subHeader: 'De donde quiere la foto',
        buttons:[
          {
            text: 'Galeria',
            role: 'Galeria',
            cssClass:'primary',
            handler: ()=> {
              this.choose_photo();
               // el usuario va tomar una foto de su mascota
            }
          },
          {
            text: 'Camara',
            role: 'Camara',
            cssClass: 'secondary',
            handler: () => {
              this.open_camera();
               // seleccionar una foto de la galeria
            }
          }
        ]
      }
    );
    await alert.present();
  }
  close(nombre:string, year:number, breed:string){
    this.mascota = {
      pet_name: nombre,
      edad: year,
      raza: breed
    }
    if (this.is_image){
      this.mascota.url = this.image64;
    }
    this.modalCtrl.dismiss({
      'mascota': this.mascota,
      'is_image': this.is_image
    });
  }
  cerrar(){
    this.modalCtrl.dismiss({
      'mascota': 'cancelo'
    })
  }
  async crear_mensaje(titulo:string, mensaje:string){
    let alert = await this.alertaCtrl.create({
      header: titulo,
      subHeader: mensaje,
      buttons:[
        {
          text: 'OK',
          role: 'OK',
          cssClass: 'primary'
        }
      ]
    });
    await alert.present();
  }
}
