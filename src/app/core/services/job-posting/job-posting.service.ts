import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IJobPostingModel } from '../../models/jobpostingModel';
import { DataService } from '../data.service';

@Injectable()
export class JobPostingService {
  moduleUrl: string;

  constructor(private _dataService: DataService) { }

  add(jobPostingModel: IJobPostingModel): Observable<IJobPostingModel> {
    this.moduleUrl = 'JobPostings';
    return this._dataService.add(this.moduleUrl, jobPostingModel);
  }

  getAll(): Observable<IJobPostingModel[]> {
    this.moduleUrl = 'JobPostings/';
    return this._dataService.getAll(this.moduleUrl);
  }

  getSingle (id: number): Observable<IJobPostingModel> {
    this.moduleUrl = 'JobPostings/';
    return this._dataService.getSingle(this.moduleUrl, id);
  }

  update (id: number, jobPostingModel: IJobPostingModel): Observable<IJobPostingModel> {
    this.moduleUrl = 'JobPostings/';
    return this._dataService.update(this.moduleUrl, id, jobPostingModel);
  }

  delete (id: number): Observable<string> {
    this.moduleUrl = 'JobPostings/';
    return this._dataService.delete(this.moduleUrl, id);
  }

}
