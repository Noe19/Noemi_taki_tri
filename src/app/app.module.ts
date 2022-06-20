import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AuthService } from './auth/service/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SobrenosotrosComponent } from './pages/sobrenosotros/sobrenosotros.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import {  AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
//perfil editado por mi
import { EditartistComponent } from './components/usuarios/perfil-artist/edit-artist/edit-artist.component';
import { ShowartistComponent } from './components/usuarios/perfil-artist/show-artist/show-artist.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//login

import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { MisionVisionComponent } from './pages/mision-vision/mision-vision.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ShowComponent } from './components/perfil/show/show.component';
//menu lateral libreria de material angular
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { EditComponent } from './components/perfil/edit/edit.component';

import { SidenavComponent } from './sidenav/sidenav.component';

import { AdministradorComponent } from './components/administrador/administrador.component';
import { SolicitudComponent } from './components/usuarios/solicitud/solicitud.component';
import { GenerosComponent } from './components/usuarios/generos/generos.component';
// material angular
import {MatTableModule} from '@angular/material/table';
import {  MatPaginatorModule ,MatPaginatorIntl} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { SolicitudAceptadasComponent } from './components/administrador/solicitud-aceptadas/solicitud-aceptadas.component';
import { DashboardUserComponent } from './components/usuarios/dashboard-user/dashboard-user.component';
import { SidenavUserComponent } from './components/usuarios/sidenav-user/sidenav-user.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { HeaderAdminComponent } from './shared/header-admin/header-admin.component';
import { HeaderArtistComponent } from './shared/header-artist/header-artist.component';
import { FooterSistemComponent } from './shared/footer-sistem/footer-sistem.component';
import { SolicitudRechazadasComponent } from './components/administrador/solicitud-rechazadas/solicitud-rechazadas.component';
import { CreateGenerosComponent } from './components/usuarios/generos/create-generos/create-generos.component';
import { EditGenerosComponent } from './components/usuarios/generos/edit-generos/edit-generos.component';
import { CreateAlbumesComponent } from './components/usuarios/Albumes/create-albumes/create-albumes.component';
import { ShowAlbumesComponent } from './components/usuarios/Albumes/show-albumes/show-albumes.component';
import { EditAlbumesComponent } from './components/usuarios/Albumes/edit-albumes/edit-albumes.component';
import { FiltroPipe } from './components/usuarios/solicitud/filtro.pipe';
import { FiltroSolicitudPipe } from './components/pipe/filtro-solicitud.pipe';
import { FiltroSolicitudAceptadasPipe } from './components/administrador/solicitud-aceptadas/filtro-solicitud-aceptadas.pipe';
import { FiltroSolicitudRechazadasPipe } from './components/administrador/solicitud-rechazadas/pipe/filtro-solicitud-rechazadas.pipe';
import { CreateCancionesComponent } from './components/usuarios/canciones/create-canciones/create-canciones.component';
import { ShowCancionesComponent } from './components/usuarios/canciones/show-canciones/show-canciones.component';
import { EditCancionesComponent } from './components/usuarios/canciones/edit-canciones/edit-canciones.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PipeGenerosPipe } from './components/usuarios/generos/pipe-generos.pipe';
import { FiltrarAlbumesPipe } from './components/usuarios/Albumes/filtrar-albumes.pipe';
import { FiltrarCancionesPipe } from './components/usuarios/canciones/filtrar-canciones.pipe';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SobrenosotrosComponent,
    WelcomeComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    MisionVisionComponent,
    PerfilComponent,
    ShowComponent,
    EditComponent,
    SidenavComponent,
    AdministradorComponent,
    SolicitudComponent,
    GenerosComponent,
    SolicitudAceptadasComponent,
    DashboardUserComponent,
    SidenavUserComponent,
    EditartistComponent,
    ShowartistComponent,
    SendEmailComponent,
    HeaderAdminComponent,
    HeaderArtistComponent,
    FooterSistemComponent,
    SolicitudRechazadasComponent,
    CreateGenerosComponent,
    EditGenerosComponent,
    CreateAlbumesComponent,
    ShowAlbumesComponent,
    EditAlbumesComponent,
    FiltroPipe,
    FiltroSolicitudPipe,
    FiltroSolicitudAceptadasPipe,
    FiltroSolicitudRechazadasPipe,
    CreateCancionesComponent,
    ShowCancionesComponent,
    EditCancionesComponent,
    PipeGenerosPipe,
    FiltrarAlbumesPipe,
    FiltrarCancionesPipe,
    
  
   
    
  
    
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    NgxChartsModule,
   
    
    
    

    
 
    
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
