import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GroupSettingsRoutingModule } from './group-settings-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    GroupSettingsRoutingModule,
    SharedModule,
    TableModule
  ],
  declarations: [GroupSettingsRoutingModule.components]
})
export class GroupSettingsModule { }
