import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PermissionService } from '../../core/services/permission.service';
import { EncryptionService } from '../../core/encryption/encryption';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router,
              private _permissionService: PermissionService,
              private _encryptionService: EncryptionService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const encUserIdKey = this._encryptionService.encript('UserId').toString();
      const decriptText =  this._encryptionService.decript(encUserIdKey);

      if (localStorage.getItem(encUserIdKey)) {
        // const route = next.routeConfig.path;
        // const encRole = this._encryptionService.encript('Role').toString();
        // const encRoleValue = localStorage.getItem(encRole);
        // const userRole = this._encryptionService.decript(encRoleValue);

        // const isAuthorized = this._permissionService.isAccessible(userRole, route);
        // if (isAuthorized === false) {
        //   this._router.navigate(['/permission-denied']);
        // }
        return true;

      } else {
        this._router.navigate(['/login']);
        return false;
      }
  }
}
