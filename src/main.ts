import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig},
    {provide: HttpClient},
    provideIonicAngular(),
    provideRouter(routes),importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"wisdom-7d1b0","appId":"1:2243956830:web:63e949a19aaa7c74da64cf","databaseURL":"https://wisdom-7d1b0-default-rtdb.firebaseio.com","storageBucket":"wisdom-7d1b0.appspot.com","apiKey":"AIzaSyA0VT1OmCQdbNVGqFeH88CF_i_bVCY4ris","authDomain":"wisdom-7d1b0.firebaseapp.com","messagingSenderId":"2243956830"}))),importProvidersFrom(provideAuth(() => getAuth())),importProvidersFrom(provideFirestore(() => getFirestore())),importProvidersFrom(provideDatabase(() => getDatabase())),importProvidersFrom(provideFunctions(() => getFunctions())),importProvidersFrom(provideMessaging(() => getMessaging())),importProvidersFrom(provideStorage(() => getStorage())),
  ],
});
