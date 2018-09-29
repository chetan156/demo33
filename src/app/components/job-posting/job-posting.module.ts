import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPostingRoutingModule } from './job-posting-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    JobPostingRoutingModule,
    SharedModule,
    CalendarModule,
    TableModule
  ],
  declarations: [ JobPostingRoutingModule.components ]
})
export class JobPostingModule { }
