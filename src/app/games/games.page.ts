import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
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
    IonTextarea,
    IonGrid, IonRow, IonCol, IonAvatar*/
  ]
})
export class GamesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
