import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';

import { DataService } from '../core/services/data.service';
import { LoginService } from '../core/services/login/login.service';
import { CandidateService } from '../core/services/candidate/candidate.service';
import { DepartmentService } from '../core/services/department/department.service';
import { UserService } from './services/user/user.service';

import { EncryptionService } from '../core/encryption/encryption';
import { CustomValidatorsService } from '../core/services/validators/custom-validators.service';
import { CustomInterceptor } from '../core/services/custom.interceptor';
import { EnsureModuleLoadedOnceGuard } from '../core/ensureModuleLoadedOnceGuard';
import { PermissionService } from '../core/services/permission.service';
import { PaginationService } from '../core/services/custom-table/custom-table.service';

import { SettingsService } from '../core/services/settings/settings.service';
import { JobPostingService } from './services/job-posting/job-posting.service';
import { TechnicalSkillsService } from './services/technical-skills/technical-skills.service';
import { FeedbackfieldsService } from './services/feedbackfields/feedbackfields.service';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, HttpModule],
  exports: [RouterModule, HttpClientModule],
  declarations: [],
  providers: [DataService, EncryptionService, LoginService, CandidateService, JobPostingService,
    TechnicalSkillsService, PermissionService, DepartmentService, PaginationService, UserService,
     CustomValidatorsService, SettingsService, FeedbackfieldsService,
     { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor,
      multi: true }
  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}
