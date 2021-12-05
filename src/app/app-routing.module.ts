//import { FunctionCall } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canLoad: [UsuarioGuard]
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)

  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
  





];
@NgModule({
  imports: [


    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {

}
