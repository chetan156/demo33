import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { FeedbackfieldsRoutingModule } from './feedbackfields-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FeedbackfieldsRoutingModule,
    SharedModule,
    TableModule
  ],
  declarations: [FeedbackfieldsRoutingModule.components]
})
export class FeedbackfieldsModule { }
