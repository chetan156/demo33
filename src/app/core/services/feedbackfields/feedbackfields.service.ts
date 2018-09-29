import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IFeedBackFieldsModel } from '../../models/feedbackfieldsModel';
import { DataService } from '../data.service';

@Injectable()
export class FeedbackfieldsService {
  moduleUrl: string;

  constructor(private _dataService: DataService) { }

  add(feedBackFieldsModel: IFeedBackFieldsModel): Observable<IFeedBackFieldsModel> {
    this.moduleUrl = 'FeedbackFields';
    return this._dataService.add(this.moduleUrl, feedBackFieldsModel);
  }

  getAll(): Observable<IFeedBackFieldsModel[]> {
    this.moduleUrl = 'FeedbackFields/';
    return this._dataService.getAll(this.moduleUrl);
  }

  getSingle (id: number): Observable<IFeedBackFieldsModel> {
    this.moduleUrl = 'FeedbackFields/GetFeedbackFieldsbyID/';
    return this._dataService.getSingle(this.moduleUrl, id);
  }

  update (id: number, feedBackFieldsModel: IFeedBackFieldsModel): Observable<IFeedBackFieldsModel> {
    this.moduleUrl = 'FeedbackFields/';
    return this._dataService.update(this.moduleUrl, id, feedBackFieldsModel);
  }
}
