import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { ModalController } from '@ionic/angular';
import { Veterinaria } from '../user-model';

@Component({
  selector: 'app-registrar-vet',
  templateUrl: './registrar-vet.page.html',
  styleUrls: ['./registrar-vet.page.scss'],
})
export class RegistrarVetPage implements OnInit {

  image64:string = "";
  imagePreview:string = "";
  is_image:boolean = false;
  
  constructor(private imagePicker:ImagePicker,
    private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
  }
  select_imagen(){
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
    },(err)=>console.log(JSON.stringify(err)));
  }
  entrar(nombre:string, direccion:string, telefono:number, email:string, password:string){
    let vet:Veterinaria;
    console.log(this.image64);
    if (this.image64){
      vet = {
        name:nombre,
        direccion:direccion,
        telefono:telefono,
        correo:email,
        url:this.image64,
        type: 'institución'
      }
    }
    else{
      vet = {
        name:nombre,
        direccion:direccion,
        telefono:telefono,
        correo:email,
        type: 'institución'
      }
    }
    
    
    
    this.modalCtrl.dismiss({
      'result': vet
    });
  }
}
