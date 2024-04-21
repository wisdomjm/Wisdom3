import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import Cursos from 'src/Data/Cursos';
import { ApicursosService } from '../services/apicursos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  IonAvatar, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonChip, IonTabs, IonTabBar, IonTabButton   
} from '@ionic/angular/standalone'

@Component({
  selector: 'app-homeapp',
  templateUrl: './homeapp.page.html',
  styleUrls: ['./homeapp.page.scss'],
  standalone: true,
  imports: [
    //IonicModule, 
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
    IonGrid, IonRow, IonCol, IonAvatar,   IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonChip, IonTabs, IonTabBar, IonTabButton    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeappPage implements OnInit {

  cursos: Cursos[];
  userId: any;
  informacionUsuario: any = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
    apellidos: '',
    avatarImagen: '',
    nombres: '',
    pais: '',
    telefono: '',
    direccion: '',
    misCursos: {}
  };

  constructor(
    //private auth: AuthenticationService,
    private api: ApicursosService,
    public afAuth: AngularFireAuth,
    private auth: AuthenticationService, 
    private router: Router) { 
      this.cursos = [];
    }

  ngOnInit() {
    //Cargo la lista de cursos Disponibles
    this.CargarListaDeCursosDisponibles();
  

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user;
        localStorage.setItem('user', JSON.stringify(this.userId));
        //JSON.parse(localStorage.getItem('user')!);
        console.log(this.userId.uid)
      }
    });

    setTimeout(() =>{
      this.cargarInformacionDelUsuario();
    },5000);
    
    
  }

  public CargarListaDeCursosDisponibles(){
    this.api.CargarListaDeCursosDisponibles().subscribe(cursos =>{
      //console.log('CURSOS: ', cursos);
      this.cursos = cursos;
    })
  }

  cargarInformacionDelUsuario(){
    this.userId = JSON.parse(localStorage.getItem('user')!);
    this.auth.GetUserData(this.userId ).subscribe(resp =>{
      this.informacionUsuario.uid = resp.uid;
      this.informacionUsuario.email = resp.email;
      this.informacionUsuario.displayName = resp.displayName;
      this.informacionUsuario.photoURL = resp.photoURL;
      this.informacionUsuario.emailVerified = resp.emailVerified;
      this.informacionUsuario.apellidos = resp.apellidos;
      this.informacionUsuario.avatarImagen = resp.avatarImagen;
      this.informacionUsuario.nombres = resp.nombres;
      this.informacionUsuario.telefono = resp.telefono;
      this.informacionUsuario.direccion = resp.direccion;
      this.informacionUsuario.misCursos = resp.misCursos;

      //console.log("DATOS: ", this.informacionUsuario);
    })
    localStorage.setItem("Usuario",this.informacionUsuario.uid);
  }


  /*logOutFromApp(){
    this.auth.LogOutUser().then(() => {
      console.log('se cerro la sesion del usuario: ');
      this.router.navigate(['/home']);
    })
    .catch((error) => console.log('Se genero un error al cerrar la sesion: ', error));
  }*/
}
