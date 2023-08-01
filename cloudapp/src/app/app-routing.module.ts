import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { LabelComponent } from './label/label.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'users/:id', component: LabelComponent },
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
