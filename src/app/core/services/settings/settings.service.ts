import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ISettingsModel } from '../../models/settingsModel';
import { DataService } from '../data.service';

@Injectable()
export class SettingsService {
  moduleUrl: string;

  constructor(private _dataService: DataService) { }

  getAll(data?: any): Observable<ISettingsModel[]> {
    if (data === undefined) { data = ''; }
    this.moduleUrl = 'Settings/';
    return this._dataService.getAll(this.moduleUrl, data);
  }

  getDistinctGroups(): Observable<string[]> {
    this.moduleUrl = 'Settings/GetDistinctGroups';
    return this._dataService.getAll(this.moduleUrl);
  }
}
