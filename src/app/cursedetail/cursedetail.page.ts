import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApicursosService } from '../services/apicursos.service';
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
  IonTextarea, IonGrid, IonRow, IonCol  } from '@ionic/angular/standalone'

@Component({
  selector: 'app-cursedetail',
  templateUrl: './cursedetail.page.html',
  styleUrls: ['./cursedetail.page.scss'],
  standalone: true,
  imports: [//IonicModule, 
    CommonModule, FormsModule,
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
    IonGrid, IonRow, IonCol
  ]
})
export class CursedetailPage implements OnInit {

  cursoAmostrar: any;

  cursoEncontrado: any = {
    id: '',
    nombreCurso: '',
    categoria: '',
    descripcionLarga: '',
    descripcionCorta: '',
    numeroSubClases: 0,
    imagenCurso: '',
    subclases: [],
    precio:0
  };

  constructor(
    private rutaActiva: ActivatedRoute,
    private apicursos: ApicursosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cursoAmostrar = this.rutaActiva.snapshot.paramMap.get("curso");
    this.CargarCursoPorId(this.cursoAmostrar);
  }

  GoHomeApp(){
    this.router.navigate(['/tabs/homeapp']);
  }

  CargarCursoPorId(idCurso:any){
    this.apicursos.buscarCursoPorNombre(idCurso).subscribe(respuesta =>{
      respuesta.forEach(res =>{
        this.cursoEncontrado.nombreCurso = res.nombreCurso;
        this.cursoEncontrado.categoria = res.categoria;
        this.cursoEncontrado.descripcionLarga = res.descripcionLarga;
        this.cursoEncontrado.descripcionCorta = res.descripcionCorta;
        this.cursoEncontrado.numeroSubClases = res.numeroSubClases;
        this.cursoEncontrado.imagenCurso = res.imagenCurso;
        this.cursoEncontrado.subclases = res.subclases;
        this.cursoEncontrado.precio = res.precio;
      })
      //this.cursoEncontrado = respuesta;
      //console.log("El curso es: ",this.cursoEncontrado);
    }, err =>{
      console.log("Error al encontrar el curso...");
    });
  }

  IrPaginaDePago(){
    this.router.navigate(['checkout/',this.cursoEncontrado.nombreCurso,this.cursoEncontrado.imagenCurso,this.cursoEncontrado.descripcionCorta,this.cursoEncontrado.precio]);
  }

}
