export class services {
    private  servicios:any[] = [
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
            img: 'assets/img/warning.png'
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
        // falta venta de productos
    ]
    getTypeServices(){
        return this.servicios;
    }
}