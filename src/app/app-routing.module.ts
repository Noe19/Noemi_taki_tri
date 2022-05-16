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
import { SolicitudRechazadasComponent } from './components/administrador/solicitud-rechazadas/solicitud-rechazadas.component';
import { GenerosComponent } from './components/usuarios/generos/generos.component';
import { CreateGenerosComponent } from './components/usuarios/generos/create-generos/create-generos.component';
import { EditGenerosComponent } from './components/usuarios/generos/edit-generos/edit-generos.component';
import { ShowAlbumesComponent } from './components/usuarios/Albumes/show-albumes/show-albumes.component';
import { CreateAlbumesComponent } from './components/usuarios/Albumes/create-albumes/create-albumes.component';
import { EditAlbumesComponent } from './components/usuarios/Albumes/edit-albumes/edit-albumes.component';
import { PermisoUsuarioGuard } from './permiso-usuario.guard';


const routes: Routes = [

  {path:'home',component:WelcomeComponent,canActivate:[PermisoUsuarioGuard]},
  {path:'sobrenosotros',component:SobrenosotrosComponent,canActivate:[PermisoUsuarioGuard]},
  {path: 'dashboard', component: DashboardComponent ,canActivate:[PermisosGuard]},
  {path: 'forgot-password', component:ForgotPasswordComponent ,canActivate:[PermisoUsuarioGuard]},
  {path: 'mision-vision', component: MisionVisionComponent ,canActivate:[PermisoUsuarioGuard] },
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
  {path:'solicitud-rechazadas',component:SolicitudRechazadasComponent,canActivate:[PermisosGuard,PermisosAdministradorGuard]},
  {path:'generos',component:GenerosComponent},
  {path:'crear-generos',component:CreateGenerosComponent},
  {path:'edit-generos/:id',component:EditGenerosComponent},
  {path:'Albumes',component:ShowAlbumesComponent},
  {path:'crear-Albumes',component:CreateAlbumesComponent},
  {path:'edit-Albumes/:id',component:EditAlbumesComponent},

  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule,),canActivate:[PermisoUsuarioGuard] },

  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule),canActivate:[PermisoUsuarioGuard] },
  {path:'**',pathMatch: 'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
