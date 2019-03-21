export interface User{
    
    apellido?:string;
    correo?:string;
    name?:string;
    phone?:number;
    direccion?:string;
    type:string;
    nMascotas?:number;
    mascotas?:Mascota[]; 
}
export interface Mascota{
    pet_name?:string;
    raza?:string;
    edad?:number;
    url?:string;
}

export interface Veterinaria {

    correo?:string;
    direccion?:string;
    name?:string;
    telefono?:number;
    url?:string;
    users?:User[];
    funciones?:string[];
    type:string;
    
}