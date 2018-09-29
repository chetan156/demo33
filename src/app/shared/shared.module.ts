import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FieldErrorDisplayComponent } from '../components/field-error-display/field-error-display.component'; 

@NgModule({
  imports: [ CommonModule, RouterModule ],
  exports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
               FieldErrorDisplayComponent ],
  declarations: [    FieldErrorDisplayComponent ],
})
export class SharedModule { }
