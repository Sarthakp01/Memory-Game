import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { Game12Component } from './game12/game12.component';
import { SelectModeComponent } from './select-mode/select-mode.component';


const routes: Routes = [
  { path: '', component: SelectModeComponent},
  { path: 'game', component: GameComponent},
  { path: 'game12', component: Game12Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
