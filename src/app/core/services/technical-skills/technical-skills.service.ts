import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ITechnicalSkillsModel } from '../../models/technicalSkillsModel';
import { DataService } from '../data.service';

@Injectable()
export class TechnicalSkillsService {
  moduleUrl: string;

  constructor(private _dataService: DataService) { }

  add(technicalSkillsModel: ITechnicalSkillsModel): Observable<ITechnicalSkillsModel> {
    this.moduleUrl = 'TechnicalSkills';
    return this._dataService.add(this.moduleUrl, technicalSkillsModel);
  }

  getAll(): Observable<ITechnicalSkillsModel[]> {
    this.moduleUrl = 'TechnicalSkills/';
    return this._dataService.getAll(this.moduleUrl);
  }

  getSingle (id: number): Observable<ITechnicalSkillsModel> {
    this.moduleUrl = 'TechnicalSkills/';
    return this._dataService.getSingle(this.moduleUrl, id);
  }

  update (id: number, technicalSkillsModel: ITechnicalSkillsModel): Observable<ITechnicalSkillsModel> {
    this.moduleUrl = 'TechnicalSkills/';
    return this._dataService.update(this.moduleUrl, id, technicalSkillsModel);
  }
}
