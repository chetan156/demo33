import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    TableModule,
    RadioButtonModule
  ],
  declarations: [UserRoutingModule.components]
})
export class UserModule { }
