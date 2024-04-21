import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicursosService } from '../services/apicursos.service';
import { loadScript } from "@paypal/paypal-js";
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
  IonTextarea, IonGrid, IonRow, IonCol, IonAvatar  } from '@ionic/angular/standalone'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
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
    IonTextarea, IonGrid, IonRow, IonCol, IonAvatar
  ]
})
export class CheckoutPage implements OnInit {

  usuario: any;
  productoActual: any = {
    nombre:'',
    descripcion:'',
    precio:0,
    imagen:'',
    idUsuario:'' 
  };

  datosDelPedido: any;
  pagoefectuado: boolean;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private registrarCurso: ApicursosService
  ) { 
    this.productoActual.nombre = this.rutaActiva.snapshot.paramMap.get('nombre');
    this.productoActual.imagen = this.rutaActiva.snapshot.paramMap.get('imagen');
    this.productoActual.descripcion = this.rutaActiva.snapshot.paramMap.get('descripcion');
    this.productoActual.precio = this.rutaActiva.snapshot.paramMap.get('precio');
    this.pagoefectuado = false;
    this.usuario = JSON.parse(localStorage.getItem('user')!);
    this.productoActual.idUsuario = this.usuario.uid;
    //console.log("Informacion: ",this.productoActual);
  }

  ngOnInit() {
    this.CargarMetodosDePagoDePaypal();
  }

  GoHomeApp(){
    this.router.navigate(['/tabs/homeapp']);
  }

  CargarMetodosDePagoDePaypal(){
    var descripcion = "";
    var valor = 0;
    descripcion = this.productoActual.nombre;
    valor = this.productoActual.precio;

    //paypal.Buttons.driver("angular", window.angular);
    loadScript(
      { 
        clientId: "AZUK7P6b_NOqfwG6edIWACcOhCYVpqeK8p7VeuMVJWNeLWXSqsIWOe7T-hGSKIaEAewrXFruru4Z4DhV",
        currency: "USD" 
      }).then((paypal:any) => {
          
          paypal.Buttons({
            createOrder: function(data: any, actions: any) {
              return actions.order.create({
                  purchase_units: [{
                      "description": descripcion, //descripcion del producto
                      "amount": {
                          "currency_code": "USD",
                          "value": valor //valor del producto
                      }
                  }]
              });
            },
            onApprove: function(data: any, actions: any) {
              return actions.order.capture().then((orderData: any) => {    
                
                //console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const elemento = document.getElementById('paypal-buttons')!;
                const contenidoAmostrar = document.getElementById('contenido')!;
                const header = document.getElementById('header-content')!;
                //const btnGuardarDatos = document.getElementById('btnConfirmacion')!;
                
                
                //const pedidoInfoDiv = document.getElementById('pedido-info');
                this.datosDelPedido = orderData.status;
                const pago = orderData.status;
                const precioTotal = orderData.purchase_units[0].amount.value;
                const descripcion = orderData.purchase_units[0].description;
                const comprador = orderData.purchase_units[0].shipping.name.full_name;
                const direccion = orderData.purchase_units[0].shipping.address.address_line_1;
                const ciudad = orderData.purchase_units[0].shipping.address.admin_area_2;
                const departamento = orderData.purchase_units[0].shipping.address.admin_area_1;
                const pais = orderData.purchase_units[0].shipping.address.country_code;
                const nombreCliente = orderData.payer.name.given_name;
                const apellidoCliente = orderData.payer.name.surname;  
                const email = orderData.payer.email_address;    
                const idpago = orderData.payer.payer_id;



                if(orderData.status === 'COMPLETED'){   
                  console.log("Yeahhhhhhhh..........")
                  elemento.innerHTML = '';
                  contenidoAmostrar.innerHTML = '',
                  header.innerHTML = '';

                  contenidoAmostrar.innerHTML = `

                  <div class="separador"></div>
                  <div class="main-logo">
                    <img src="../../assets/icon/wisdomlogo.jpg" alt="">
                  </div>
                  <h1 class="ion-text-center texto-grande">
                    Wisdom JM
                  </h1>
                  <h1 class="ion-text-center">Confirmacion de Pago</h1>
                  <div class="separador"></div>
                  <ion-card>
                    <ion-card-content>
                      <p><strong>Estado del pago:</strong> ${orderData.status}</p>
                      <p><strong>Descripcion:</strong> ${orderData.purchase_units[0].description}</p>
                      <p><strong>Valor Pagado:</strong> ${orderData.purchase_units[0].amount.value}</p>
                      <p><strong>ID Pago:</strong> ${orderData.payer.payer_id}</p>
                      <br>
                      
                    </ion-card-content>
                  </ion-card>
                  <ion-button mode="ios" expand=block color="jmvioleta" id="btnGuardar">Aceptar</ion-button>
                `;
                  //this.router.navigate(['/comprobaciondepago',pago,precioTotal,descripcion,comprador,direccion,ciudad,departamento,pais,nombreCliente,apellidoCliente,email,idpago]); 
                 const guardar = document.getElementById('btnGuardar')!;  
                 guardar.addEventListener("click", guardarMisCursos);
                }
               

              });


            },
            onError: function(err: any) {
              console.log(err);
            },
            style: {
              layout: 'vertical',
              color:  'blue',
              shape:  'rect',
              label:  'paypal'
            }
          }).render("#paypal-buttons").catch((error: any) => {
          console.error("failed to render the PayPal Buttons", error);
        });
      })
      .catch((error) => {
        console.error("failed to load the PayPal JS SDK script", error);
      });

      
    const guardarMisCursos = () =>{
        console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
        this.guardarInformacion();
    }

  }


  guardarInformacion(){
    this.registrarCurso.AgregarCursoAMisCursos(this.productoActual).then(() =>{
      console.log("se registro el curso");
      this.GoHomeApp();
    },(erro:any) =>{
      console.log("error al registrar el curso");  
    })
  }

}







/*


Capture result {id: '9H858521JP364741F', intent: 'CAPTURE', status: 'COMPLETED', purchase_units: Array(1), payer: {…}, …} {
  "id": "9H858521JP364741F",
  "intent": "CAPTURE",
  "status": "COMPLETED",
  "purchase_units": [
    {
      "reference_id": "default",
      "amount": {
        "currency_code": "USD",
        "value": "120.00"
      },
      "payee": {
        "email_address": "sb-xbcvo29589935@business.example.com",
        "merchant_id": "26NPVLLNSHFTA"
      },
      "description": "Aprendiendo a conducir sin estrellarse",
      "soft_descriptor": "PAYPAL *TEST STORE",
      "shipping": {
        "name": {
          "full_name": "tavo herduw"
        },
        "address": {
          "address_line_1": "calle 35 #4c 105",
          "admin_area_2": "valledupar",
          "admin_area_1": "AL",
          "postal_code": "00000",
          "country_code": "US"
        }
      },
      "payments": {
        "captures": [
          {
            "id": "1VT29798W5830783V",
            "status": "COMPLETED",
            "amount": {
              "currency_code": "USD",
              "value": "120.00"
            },
            "final_capture": true,
            "seller_protection": {
              "status": "NOT_ELIGIBLE"
            },
            "create_time": "2024-04-13T01:41:18Z",
            "update_time": "2024-04-13T01:41:18Z"
          }
        ]
      }
    }
  ],
  "payer": {
    "name": {
      "given_name": "tavo",
      "surname": "herduw"
    },
    "email_address": "dev@admin.com",
    "payer_id": "CJ9A97WDRAFDG",
    "address": {
      "country_code": "US"
    }
  },
  "create_time": "2024-04-13T01:35:37Z",
  "update_time": "2024-04-13T01:41:18Z",
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v2/checkout/orders/9H858521JP364741F",
      "rel": "self",
      "method": "GET"
    }
  ]
}






*/
