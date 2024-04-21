import { Component } from '@angular/core';
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
  IonAvatar, IonTabs, IonTabBar, IonTabButton 
} from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
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
    IonAvatar,IonTabs, IonTabBar, IonTabButton, 
    RouterLinkWithHref],
})
export class HomePage {
  constructor() {}
}
