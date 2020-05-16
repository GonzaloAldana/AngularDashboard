import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoComponent } from './histo/histo.component';
import { PieComponent } from './pie/pie.component';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [
  { path: 'histo', component: HistoComponent },
  { path: 'pie', component: PieComponent },
  { path: 'inicio', component: InicioComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
