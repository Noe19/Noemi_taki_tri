import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobrenosotrosComponent } from './pages/sobrenosotros/sobrenosotros.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';

const routes: Routes = [

  {path:'home',component:WelcomeComponent},
  {path:'sobrenosotros',component:SobrenosotrosComponent},
  {path:'**',pathMatch: 'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
