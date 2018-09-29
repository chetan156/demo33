import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpErrorResponse, HttpParams } from '@angular/common/http';

 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
 import { catchError, retry } from 'rxjs/operators';
 import 'rxjs/add/operator/map';

 import { environment } from '../../../../environments/environment';
 import { CandidateModel } from '../../../core/models/candidateModel';
 import { DataService } from '../../services/data.service';
@Injectable()
export class CandidateService {


  moduleUrl: string;

  constructor(private _dataService: DataService) { }

  add(jobPostingModel: CandidateModel): Observable<CandidateModel> {
    this.moduleUrl = 'Candidates';
    return this._dataService.add(this.moduleUrl, jobPostingModel);
  }

  getAll(): Observable<CandidateModel[]> {
    this.moduleUrl = 'Candidates/';
    return this._dataService.getAll(this.moduleUrl);
  }

  getSingle (id: number): Observable<CandidateModel> {
    this.moduleUrl = 'Candidates/';
    return this._dataService.getSingle(this.moduleUrl, id);
  }

  update (id: number, jobPostingModel: CandidateModel): Observable<CandidateModel> {
    this.moduleUrl = 'Candidates/';
    return this._dataService.update(this.moduleUrl, id, jobPostingModel);
  }

  delete (id: number): Observable<string> {
    this.moduleUrl = 'Candidates/';
    return this._dataService.delete(this.moduleUrl, id);
  }


//   private moduleUrl = 'Candidates/';
//   private functionName = 'SearchCandidates/';
//   constructor(private _dataService: DataService, public http: HttpClient) {
//   }


//   getCandidate() {
//     return  this._dataService.getAll(this.moduleUrl);
//   }

//   getCandidateByQuery(query: string) {
//     return  this._dataService.getAll(this.moduleUrl + this.functionName, query);
//   }

//   getCandidateById(candidateId: number) {
//     return  this._dataService.getSingle(this.moduleUrl, candidateId);
//   }

//   deleteCandidateById(candidateId: number) {
//     return  this._dataService.delete(this.moduleUrl, candidateId);
//   }


//    addEditCandidate(candidate: CandidateModel) {
//      if (candidate.candidateId > 0) {
//       return  this._dataService.update(this.moduleUrl, candidate.candidateId, candidate);
//      } else {
//       return  this._dataService.add(this.moduleUrl, candidate);
//      }

//   }

//   upload(fileToUpload: any, candidateId: number) {
//     const input = new FormData();
//     input.append('file', fileToUpload);
//     return this.http
//         .post('http://localhost:59393/api/Candidates/UploadFile/4', input);
// }
}
