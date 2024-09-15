import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Piece3dComponent } from './piece3D/piece3D.component';
import { Room2Component } from './room2/room2/room2.component';
import { Room21Component } from './room2/room21/room21.component';
import { Room22Component } from './room2/room22/room22.component';
import { Room3Component } from './room3/room3/room3.component';
import { Room31Component } from './room3/room31/room31.component';
import { Room32Component } from './room3/room32/room32.component';
import { TrollComponent } from './troll/troll.component';
import { CodeCouloirComponent } from './code-couloir/code-couloir.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Piece3dComponent,
    Room2Component,
    Room21Component,
    Room22Component,
    Room3Component,
    Room31Component,
    Room32Component,
    TrollComponent,
    CodeCouloirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
