import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';

@Injectable()
export class PermissionService {

  // Route Permissions
  routes: any = [
    {
      link: 'dashboard',
      permittedRoles: ['SYSTEM ADMIN', 'HR']
    },
    {
      link: 'job-posting',
      permittedRoles: ['SYSTEM ADMIN', 'HR']
    },
    {
      link: 'candidate',
      permittedRoles: ['SYSTEM ADMIN']
    },
    {
      link: 'department',
      permittedRoles: ['SYSTEM ADMIN', 'HR']
    },
    {
      link: 'technical-skills',
      permittedRoles: ['SYSTEM ADMIN']
    },
    {
      link: 'group-settings',
      permittedRoles: ['SYSTEM ADMIN']
    },
    {
      link: 'user',
      permittedRoles: ['SYSTEM ADMIN', 'HR']
    },
    {
      link: 'interview',
      permittedRoles: ['SYSTEM ADMIN', 'HR']
    },
    {
      link: 'feedbackfields',
      permittedRoles: ['SYSTEM ADMIN', 'HR']
    }
  ];

  constructor() { }

  public isAccessible(userRole: string, route: string): boolean  {
    const routeA = this.routes.find(item => item.link.toUpperCase() === route.toUpperCase())
                    .permittedRoles.find(item => item === userRole.toUpperCase());
    if (routeA && routeA.toUpperCase() === userRole.toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }

}
