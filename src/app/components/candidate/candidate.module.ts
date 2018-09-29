import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule,
    TableModule,
    MultiSelectModule,
    InputMaskModule
  ],
  declarations: [CandidateRoutingModule.components]
})
export class CandidateModule { }
