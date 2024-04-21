import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref } from '@angular/router';
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
  IonTextarea, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonAvatar  } from '@ionic/angular/standalone'*/

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.page.html',
  styleUrls: ['./userdata.page.scss'],
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
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserdataPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
