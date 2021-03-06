import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [LoginRoutingModule.components]
})
export class LoginModule { }
