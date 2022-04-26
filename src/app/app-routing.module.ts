import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobrenosotrosComponent } from './pages/sobrenosotros/sobrenosotros.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MisionVisionComponent } from './pages/mision-vision/mision-vision.component';
import { ShowComponent } from './components/perfil/show/show.component';
import { EditComponent } from './components/perfil/edit/edit.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [

  {path:'home',component:WelcomeComponent,},
  {path:'sobrenosotros',component:SobrenosotrosComponent},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'mision-vision', component: MisionVisionComponent },
  {path : 'show/:id',component: ShowComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'perfil',component:PerfilComponent},

  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },

  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  {path:'**',pathMatch: 'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
