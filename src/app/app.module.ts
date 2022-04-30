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

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//login

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
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
import {  MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { SolicitudAceptadasComponent } from './components/administrador/solicitud-aceptadas/solicitud-aceptadas.component';
import { DashboardUserComponent } from './components/usuarios/dashboard-user/dashboard-user.component';
import { SidenavUserComponent } from './components/usuarios/sidenav-user/sidenav-user.component'









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
    

    
 
    
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
