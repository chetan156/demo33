import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobPostingComponent } from './job-posting.component';

const routes: Routes = [
  {
      path: '',
      component: JobPostingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPostingRoutingModule {
  static components = [ JobPostingComponent ];
}
