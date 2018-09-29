import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateComponent } from './candidate.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
      path: '',
      component: CandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule {
  static components = [CandidateComponent] ;

}
