import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobrenosotrosComponent } from './pages/sobrenosotros/sobrenosotros.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { MisionVisionComponent } from './pages/mision-vision/mision-vision.component';
import { ShowComponent } from './components/perfil/show/show.component';
import { EditComponent } from './components/perfil/edit/edit.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PermisosGuard } from './permisos.guard';
import { SolicitudComponent } from './components/usuarios/solicitud/solicitud.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { SolicitudAceptadasComponent } from './components/administrador/solicitud-aceptadas/solicitud-aceptadas.component';
import { PermisosAdministradorGuard } from './permisos-administrador.guard';
import { DashboardUserComponent } from './components/usuarios/dashboard-user/dashboard-user.component';
import { EditartistComponent } from './components/usuarios/perfil-artist/edit-artist/edit-artist.component';
import { ShowartistComponent } from './components/usuarios/perfil-artist/show-artist/show-artist.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';


const routes: Routes = [

  {path:'home',component:WelcomeComponent,},
  {path:'sobrenosotros',component:SobrenosotrosComponent},
  {path: 'dashboard', component: DashboardComponent ,canActivate:[PermisosGuard]},
  {path: 'forgot-password', component:ForgotPasswordComponent },
  {path: 'mision-vision', component: MisionVisionComponent  },
  {path : 'show/:id',component: ShowComponent,canActivate:[PermisosGuard] },
  {path:'edit/:id',component:EditComponent,canActivate:[PermisosGuard] },
  {path:'perfil',component:PerfilComponent,canActivate:[PermisosGuard] },
  {path:'solicitud',component:SolicitudComponent,canActivate:[PermisosGuard]},
  {path:'administrador',component:AdministradorComponent,canActivate:[PermisosGuard,PermisosAdministradorGuard]},
  {path:'solicitud-aceptadas',component:SolicitudAceptadasComponent,canActivate:[PermisosGuard,PermisosAdministradorGuard]},
  {path:'dashboard-user',component:DashboardUserComponent,canActivate:[PermisosGuard] },
  {path:'edit-artist/:id',component:EditartistComponent,canActivate:[PermisosGuard] },
  {path:'show-artist/:id',component:ShowartistComponent,canActivate:[PermisosGuard] },
  {path:'send-email',component:SendEmailComponent},

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
