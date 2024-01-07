import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCardComponent } from './game-card/game-card.component';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { Game12Component } from './game12/game12.component';
import { SelectModeComponent } from './select-mode/select-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCardComponent,
    GameComponent,
    Game12Component,
    SelectModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
