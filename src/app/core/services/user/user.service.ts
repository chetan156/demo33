import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IUserModel } from '../../models/userModel';
import { DataService } from '../data.service';

@Injectable()
export class UserService {

  moduleUrl: string;

  constructor(private _dataService: DataService) { }

  add(jobPostingModel: IUserModel): Observable<IUserModel> {
    this.moduleUrl = 'Users';
    return this._dataService.add(this.moduleUrl, jobPostingModel);
  }

  getAll(): Observable<IUserModel[]> {
    this.moduleUrl = 'Users';
    return this._dataService.getAll(this.moduleUrl);
  }

  getSingle (id: number): Observable<IUserModel> {
    this.moduleUrl = 'Users/';
    return this._dataService.getSingle(this.moduleUrl, id);
  }

  update (id: number, jobPostingModel: IUserModel): Observable<IUserModel> {
    this.moduleUrl = 'Users/';
    return this._dataService.update(this.moduleUrl, id, jobPostingModel);
  }

  delete (id: number): Observable<string> {
    this.moduleUrl = 'Users/';
    return this._dataService.delete(this.moduleUrl, id);
  }


}
