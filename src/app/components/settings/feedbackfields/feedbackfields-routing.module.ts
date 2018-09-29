import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackfieldsComponent } from './feedbackfields.component';

const routes: Routes = [
  {
      path: '',
      component: FeedbackfieldsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackfieldsRoutingModule {
  static components = [ FeedbackfieldsComponent ];
}
