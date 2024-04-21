import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonInput, 
  IonList, 
  IonItem, 
  IonButtons, 
  IonBackButton, 
  IonLabel, 
  IonSpinner, 
  IonFooter, 
  IonTextarea, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent  } from '@ionic/angular/standalone'

@Component({
  selector: 'app-comprobaciondepago',
  templateUrl: './comprobaciondepago.page.html',
  styleUrls: ['./comprobaciondepago.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon, 
    IonInput, 
    IonList, 
    IonItem, 
    IonButtons, 
    IonBackButton, 
    IonLabel, 
    IonSpinner, 
    IonFooter, 
    IonTextarea, IonGrid, IonRow, IonCol, IonAvatar, IonCard, IonCardContent 
  ]
})
export class ComprobaciondepagoPage implements OnInit {

  productoActual: any = {
    pagostatus:'',
    preciototal:'',
    descripcion:'',
    comprador:'',
    direccion:'',
    ciudad:'',
    departamento:'',
    pais:'',
    nombreCliente:'',
    apellidoCliente:'',
    email:'',
    idpago:'',
  };

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { 
    this.productoActual.pagostatus = this.rutaActiva.snapshot.paramMap.get('pagoStatus');
    this.productoActual.preciototal = this.rutaActiva.snapshot.paramMap.get('precioTotal');
    this.productoActual.descripcion = this.rutaActiva.snapshot.paramMap.get('descripcion');
    this.productoActual.comprador = this.rutaActiva.snapshot.paramMap.get('comprador');
    this.productoActual.direccion = this.rutaActiva.snapshot.paramMap.get('direccion');
    this.productoActual.ciudad = this.rutaActiva.snapshot.paramMap.get('ciudad');
    this.productoActual.departamento = this.rutaActiva.snapshot.paramMap.get('departamento');
    this.productoActual.pais = this.rutaActiva.snapshot.paramMap.get('pais');
    this.productoActual.nombreCliente = this.rutaActiva.snapshot.paramMap.get('nombreCliente');
    this.productoActual.apellidoCliente = this.rutaActiva.snapshot.paramMap.get('apellidoCliente');
    this.productoActual.email = this.rutaActiva.snapshot.paramMap.get('email');
    this.productoActual.idpago = this.rutaActiva.snapshot.paramMap.get('idpago');
  }

  ngOnInit() {
  }

  GoHomeApp(){
    this.router.navigate(['/tabs/homeapp']);
  }

}
