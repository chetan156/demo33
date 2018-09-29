import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalSkillsRoutingModule } from './technical-skills-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    TechnicalSkillsRoutingModule,
    SharedModule,
    TableModule
  ],
  declarations: [TechnicalSkillsRoutingModule.components]
})
export class TechnicalSkillsModule { }
