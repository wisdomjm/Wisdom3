import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
/*import { 
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
  IonTextarea, IonGrid, IonRow, IonCol, IonAvatar  } from '@ionic/angular/standalone'*/


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    /*IonHeader, 
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
    IonTextarea, IonGrid, IonRow, IonCol, IonAvatar*/
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProfilePage implements OnInit {
  userId: any;
  informacionUsuario: any = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
    apellidos: '',
    //avatarImagen: '',
    nombres: '',
    pais: '',
    telefono: '',
    direccion: '',
    misCursos: {}
  };
  cambiaraVatar: boolean = false;
  avatarSeleccionado: any;
  Avatares: any = [];

  constructor(
    private auth: AuthenticationService,
    private action: ActionSheetController,
    private loadingCtrl: LoadingController

  ) { }
  
  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user')!);
    console.log("Id: ",this.userId.uid);
    this.cargarInformacionDelUsuario();
    this.cambiaraVatar = false;
    this.avatarSeleccionado = '../../assets/avatars/avatar01.gif';
    this.CargarAvatares();
  }

  CambiarAvatar(){
    this.cambiaraVatar = !this.cambiaraVatar;
  }

  CargarAvatares(){
    this.Avatares = [
      {
        id:0,
        ruta: '../../assets/avatars/avatar01.gif'
      },
      {
        id:1,
        ruta: '../../assets/avatars/avatar02.gif'
      },
      {
        id:2,
        ruta: '../../assets/avatars/avatar03.gif'
      },
      {
        id:3,
        ruta: '../../assets/avatars/avatar04.gif'
      }
    ]

    
  }

  SeleccionarAvatar(myavatar:any){
    this.avatarSeleccionado = myavatar;
    this.cambiaraVatar = !this.cambiaraVatar;
  }

  cargarInformacionDelUsuario(){
    this.auth.GetUserData(this.userId).subscribe(resp =>{
      
      this.informacionUsuario.uid = resp.uid;
      this.informacionUsuario.email = resp.email;
      this.informacionUsuario.displayName = resp.displayName;
      this.informacionUsuario.photoURL = resp.photoURL;
      this.informacionUsuario.emailVerified = resp.emailVerified;
      this.informacionUsuario.apellidos = resp.apellidos;
      //this.informacionUsuario.avatarImagen = resp.avatarImagen;
      this.informacionUsuario.nombres = resp.nombres;
      this.informacionUsuario.telefono = resp.telefono;
      this.informacionUsuario.direccion = resp.direccion;
      this.informacionUsuario.misCursos = resp.misCursos;

      //console.log("DATOS: ", this.informacionUsuario);
    })
  }

  ActualizarInformacionDelUsario(){
    this.informacionUsuario.photoURL = this.avatarSeleccionado;
    this.auth.actualizarDatosUsuario(this.informacionUsuario.uid,this.informacionUsuario).then(() =>{
      this.auth.MensajeDeVerificacion("Se ha Guardado los datos correctamente.");
    }).catch((err:any) =>{
      console.log("Error al guardar: ",err);
      this.auth.MensajeDeVerificacion("Error al guardar la informacion.");
    }).finally(() =>{
      this.cargarInformacionDelUsuario();
    })
  }

  logout(){
    this.auth.SignOut();
  }

  async CargarOpcionesParaFoto(){
    const actionSheet = await this.action.create({
      header: 'Cargar Foto de Perfil',
      buttons: [
        {
          text: 'Cargar desde Galeria',
          icon:'images-outline',
          handler: () => {
            this.cargarDesdeGaleria()
          }
        },
        {
          text: 'Tomar Foto',
          icon:'camera',
          handler: () => {
            this.CargarDesdeCamara()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }


  cargarDesdeGaleria(){
    console.log("Cargar desde Galeria");
  }

  async CargarDesdeCamara(){
    console.log("Cargar desde Camara");
    
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64
      });

      
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.base64String;
      console.log("IMAGE URL: ", imageUrl);
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
    
  }

  async MostrarLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      //cssClass: 'custom-loading',
      spinner: 'bubbles' 

    });

    loading.present();
  }

}
