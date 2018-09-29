import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
      path: '',
      component: LayoutComponent,
      children: [
          {
            path: '', redirectTo: 'dashboard'
          },
          {
            path: 'permission-denied',
            loadChildren: '../components/permission-denied/permission-denied.module#PermissionDeniedModule'
          },
          {
            path: 'dashboard',
            loadChildren: '../components/dashboard/dashboard.module#DashboardModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'candidate',
            loadChildren: '../components/candidate/candidate.module#CandidateModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'job-posting',
            loadChildren: '../components/job-posting/job-posting.module#JobPostingModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'department',
            loadChildren: '../components/settings/department/department.module#DepartmentModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'technical-skills',
            loadChildren:
            '../components/settings/technical-skills/technical-skills.module#TechnicalSkillsModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'feedbackfields',
            loadChildren:
            '../components/settings/feedbackfields/feedbackfields.module#FeedbackfieldsModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'user',
            loadChildren:
            '../components/user/user.module#UserModule',
            canActivate: [AuthGuard]
          }

          // {
          //   path: 'interview',
          //   loadChildren:
          //   '../components/interview/interview.module#InterviewModule',
          //   canActivate: [AuthGuard]
          // },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
