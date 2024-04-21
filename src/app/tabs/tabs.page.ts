import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonicModule } from '@ionic/angular';
import { IonTabs, IonTabBar, IonTabButton, IonLabel  } from '@ionic/angular/standalone'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [//IonicModule, 
    CommonModule, FormsModule,
    IonTabs, IonTabBar, IonTabButton, IonLabel 
  ]
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
