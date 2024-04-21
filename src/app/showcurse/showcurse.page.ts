import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref, Router } from '@angular/router';
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
  selector: 'app-showcurse',
  templateUrl: './showcurse.page.html',
  styleUrls: ['./showcurse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref,
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
    IonTextarea,
    IonGrid, IonRow, IonCol, IonAvatar*/
  ]
})
export class ShowcursePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
