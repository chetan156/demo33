import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule, NgProgressInterceptor} from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,             // Main routes for application
    CoreModule,                   // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule,                 // Shared (multi-instance) objects
    BrowserAnimationsModule,      // required animations module
    ToastrModule.forRoot(),       // ToastrModule added
    NgProgressModule,             // ngx progress bar
  ],
  providers: [
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor,  multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
