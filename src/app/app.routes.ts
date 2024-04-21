import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage),
    children:[
      {
        path: 'curses',
        loadComponent: () => import('./curses/curses.page').then( m => m.CursesPage)
      },
      {
        path: 'homeapp',
        loadComponent: () => import('./homeapp/homeapp.page').then( m => m.HomeappPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
      },
      {
        path: 'games',
        loadComponent: () => import('./games/games.page').then( m => m.GamesPage)
      }
    ]
  },
  {
    path: 'checkout/:nombre/:imagen/:descripcion/:precio',
    loadComponent: () => import('./checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'suport',
    loadComponent: () => import('./suport/suport.page').then( m => m.SuportPage)
  },
  {
    path: 'userdata',
    loadComponent: () => import('./userdata/userdata.page').then( m => m.UserdataPage)
  },
  {
    path: 'showcurse',
    loadComponent: () => import('./showcurse/showcurse.page').then( m => m.ShowcursePage)
  },
  {
    path: 'chatvoice',
    loadComponent: () => import('./chatvoice/chatvoice.page').then( m => m.ChatvoicePage)
  },
  {
    path: 'cursedetail/:curso',
    loadComponent: () => import('./cursedetail/cursedetail.page').then( m => m.CursedetailPage)
  },
  {
    path: 'comprobaciondepago/:pagoStatus/:precioTotal/:descripcion/:comprador/:direccion/:ciudad/:departamento/:pais/:nombreCliente/:apellidoCliente/:email/:idpago',
    loadComponent: () => import('./comprobaciondepago/comprobaciondepago.page').then( m => m.ComprobaciondepagoPage)
  }
];
