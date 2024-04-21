import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonicModule } from '@ionic/angular';
import { Router, RouterLinkWithHref } from '@angular/router';
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
  IonTextarea, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonAvatar  
} from '@ionic/angular/standalone'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonTextarea,
    IonGrid, IonRow, IonCol, IonAvatar
  ]
})
export class LoginPage implements OnInit {

  authData:any ={
    email:'',
    password:''
  }

  contrasena: string = "";
  mostrarContrasena: boolean = false;

  constructor(
    private auth: AuthenticationService, 
    private router: Router) { }

  //[routerLink]="['/tabs/homeapp']"
  ngOnInit() {
  }

  loginToApp(){
    this.auth.SignIn(this.authData.email, this.authData.password ).then((response:any)=>{
      console.log('se inicio el login en la App: ', response);
      //if(response.user.uid){
        //this.router.navigate(['/tabs/homeapp']);
      //}else{
        //console.log('Se genero un error al realizar login: ', response)
        //this.auth.MensajeDeVerificacion("Error de Email o Contraseña, Verifique su información");
      //}
      //this.auth.MensajeDeVerificacion("Bienvenido.");
      
    })
    .catch(error => {
      console.log('Se genero un error al realizar login: ', error)
      this.auth.MensajeDeVerificacion("Error de Email o Contraseña, Verifique su información");
    });
  }

  loginGoogle(){
    this.auth.loginWithGoogle().then((response:any) => {
      console.log('Se inicio sesion con google. ', response);
      if(response){
        this.router.navigate(['/tabs/homeapp']);
      }else{
        console.log('Se genero un error al realizar login: ', response)
      }
    })
    .catch(
      (error) => {
        console.log('Se genero un error: ', error)
        return;
    });
  }

}
