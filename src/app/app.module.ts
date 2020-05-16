import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarGonzaloNoeComponent } from './nav-bar-gonzalo-noe/nav-bar-gonzalo-noe.component';
import { HistoComponent } from './histo/histo.component';
import { PieComponent } from './pie/pie.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarGonzaloNoeComponent,
    HistoComponent,
    PieComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
