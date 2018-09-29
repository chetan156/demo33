import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpErrorResponse, HttpParams } from '@angular/common/http';

 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
 import { catchError, retry } from 'rxjs/operators';
 import 'rxjs/add/operator/map';

 import { environment } from '../../../../environments/environment';
 import { DepartmentModel } from '../../../core/models/departmentModel';
 import { DataService } from '../../services/data.service';

@Injectable()
export class DepartmentService {


  moduleUrl: string;

  constructor(private _dataService: DataService) { }

  add(jobPostingModel: DepartmentModel): Observable<DepartmentModel> {
    this.moduleUrl = 'Departments';
    return this._dataService.add(this.moduleUrl, jobPostingModel);
  }

  getAll(): Observable<DepartmentModel[]> {
    this.moduleUrl = 'Departments/';
    return this._dataService.getAll(this.moduleUrl);
  }

  getSingle (id: number): Observable<DepartmentModel> {
    this.moduleUrl = 'Departments/';
    return this._dataService.getSingle(this.moduleUrl, id);
  }

  update (id: number, jobPostingModel: DepartmentModel): Observable<DepartmentModel> {
    this.moduleUrl = 'Departments/';
    return this._dataService.update(this.moduleUrl, id, jobPostingModel);
  }

  delete (id: number): Observable<string> {
    this.moduleUrl = 'Departments/';
    return this._dataService.delete(this.moduleUrl, id);
  }


  // private moduleUrl = 'Departments/';
  // private functionName = 'SearchDepartments/';
  // constructor(private _dataService: DataService, public http: HttpClient) {
  // }


   getDepartment() {
     return  this._dataService.getAll(this.moduleUrl);
   }

  // getDepartmentByQuery(query: string) {
  //   return  this._dataService.getAll(this.moduleUrl, query);
  // }

  // getDepartmentById(candidateId: number) {
  //   return  this._dataService.getSingle(this.moduleUrl, candidateId);
  // }

  // deleteDepartmentById(candidateId: number) {
  //   return  this._dataService.delete(this.moduleUrl, candidateId);
  // }


  //  addEditDepartment(department: DepartmentModel) {
  //    if (department.departmentId > 0) {
  //     return  this._dataService.update(this.moduleUrl, department.departmentId, department);
  //    } else {
  //     return  this._dataService.add(this.moduleUrl, department);
  //    }

  // }

}
