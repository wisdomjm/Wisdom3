import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterLinkWithHref, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
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
  IonTextarea  } from '@ionic/angular/standalone'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [//IonicModule, 
    CommonModule, FormsModule, RouterLinkWithHref,
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
    IonTextarea
  ]
})
export class SignupPage implements OnInit {

  userToRegister: any = {
    email:'',
    password:''
  }

  userDataToCompleteRegister: any = {
    email:'',
    userIde:''
  }

  contrasena: string = "";
  mostrarContrasena: boolean = false;

  constructor(
    private auth: AuthenticationService, 
    private route: Router,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  RegisterUser(){
    this.auth.SignUp(this.userToRegister.email, this.userToRegister.password ).then((response) => {
      console.log('Respuesta del Servidor al Registrar Usuario: ', response)

      /* controlador de alerta */
      //this.presentAlertWithCustomButtons();
      
    })
    .catch(error => console.log('Se genero un error al registrar datos: ', error));
  }

  async presentAlertWithCustomButtons() {
    const alert = await this.alertController.create({
      message: 'Se ha Registrado su email y contraseña; por favor continue con el registro.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.route.navigate(['/login']);
            console.log('Botón Aceptar pulsado');
            // Aquí tu lógica al pulsar el botón Aceptar
          },
          //cssClass: 'boton-aceptar mi-estilo-personalizado',
          role: '' // rol vacío significa que no es un botón de cancelación
        },
        /*{
          text: 'Cancelar',
          handler: () => {
            console.log('Botón Cancelar pulsado');
            // Aquí tu lógica al pulsar el botón Cancelar
          },
          //cssClass: 'boton-cancelar otro-estilo-personalizado',
          role: 'cancel' // este botón cerrará la alerta sin hacer otra acción
        }*/
        // Puedes agregar más botones aquí
      ]
    });
  
    await alert.present();
  }

}
