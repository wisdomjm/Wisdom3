import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApicursosService } from '../services/apicursos.service';
import { RouterLinkWithHref, Router } from '@angular/router';
import {IonThumbnail} from '@ionic/angular/standalone'
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
  selector: 'app-curses',
  templateUrl: './curses.page.html',
  styleUrls: ['./curses.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkWithHref,IonThumbnail,
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
export class CursesPage implements OnInit {

  usuario: any;
  misCursos: any = [];
  constructor(
    public miscursos: ApicursosService
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user')!);
    this.cargarMisCursos();
  }

  cargarMisCursos(){
    this.miscursos.CargarMisCursos(this.usuario.uid).subscribe(res =>{
      this.misCursos = res;
    })
  }

}
