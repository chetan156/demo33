import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionDeniedComponent } from './permission-denied.component';

const routes: Routes = [
  {
      path: '',
      component: PermissionDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionDeniedRoutingModule {
  static components = [ PermissionDeniedComponent ];
 }
