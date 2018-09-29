import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { DepartmentRoutingModule } from './department-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    TableModule
  ],
  declarations: [DepartmentRoutingModule.components]
})
export class DepartmentModule { }
