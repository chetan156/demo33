import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupSettingsComponent } from './group-settings.component';

const routes: Routes = [
  {
      path: '',
      component: GroupSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupSettingsRoutingModule {
  static components = [ GroupSettingsComponent ];
 }
