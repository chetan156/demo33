import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { forEach } from '@angular/router/src/utils/collection';
import { elementAt } from 'rxjs/operator/elementAt';

import { CandidateModel, Candidate, CandidateFiles } from '../../core/models/candidateModel';
import { CandidateService } from '../../core/services/candidate/candidate.service';
import { JobPostingService } from '../../core/services/job-posting/job-posting.service';
import { EncryptionService } from '../../core/encryption/encryption';
import { CustomValidatorsService } from '../../core/services/validators/custom-validators.service';
import { PaginationService } from '../../core/services/custom-table/custom-table.service';
import { IJobPostingModel } from '../../core/models/jobpostingModel';
import { ITechnicalSkillsModel } from '../../core/models/technicalSkillsModel';
import { TechnicalSkillsService } from '../../core/services/technical-skills/technical-skills.service';

import { SelectItem } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  // Declarations
  action: string;
  id = 0;
  minDate: Date;
  candidateModel: CandidateModel;
  gridData: CandidateModel[];
  jobpostingModel: IJobPostingModel[];
  candidateForm: FormGroup;
  defaultOption = '';
  cols: any[];
  candidateTechnicalSkills: ITechnicalSkillsModel[];
  tSkills: any[];
  candidateSkill: ITechnicalSkillsModel [];
  // End: Declarations

  constructor(private _fb: FormBuilder,
              private _customValidatorsService: CustomValidatorsService,
              private _jobPostingService: JobPostingService,
              private _candidateService: CandidateService,
              private _technicalSkillsService: TechnicalSkillsService,
              private _toastr: ToastrService) {
    this.configDatePicker();
    this.initJobPostingModel();
    this.createForm();
  }

  ngOnInit() {
    this.action = 'list';
    this.tSkills = [];
    this.candidateSkill = [];
    this.configCandidateGrid();
    this.loadCandidateGrid();
    this.initSettings();
  }

  resetForm() {
    this.candidateModel.jobPostingId = 0;
    this.candidateModel.candidateId = 0;
    this.candidateModel.createdBy = 0;
    this.candidateModel.createdDate = '';
    this.candidateModel.emailId = '';
    this.candidateModel.firstName = '';
    this.candidateModel.lastName = '';
    this.candidateModel.modifiedBy = 0;
    this.candidateModel.modifiedDate = '';
    this.candidateModel.primaryContactNumber = '';
    this.candidateModel.secondaryContactNumber = '';
    this.candidateModel.alternateEmailId = '';

    this.id = 0;
  }

  createForm() {
    this.candidateForm = this._fb.group({
      candidateId: [ this.candidateModel['candidateId']],
      jobPostingId: [ this.candidateModel['jobPostingId'], Validators.required ],
      emailId: [ this.candidateModel['emailId'], Validators.required ],
      firstName: [ this.candidateModel['firstName'], Validators.required ],
      lastName: [ this.candidateModel['lastName'], Validators.required ],
      primaryContactNumber: [ this.candidateModel['primaryContactNumber'], Validators.required ],
      secondaryContactNumber: [ this.candidateModel['secondaryContactNumber'], Validators.required ],
      alternateEmailId: [ this.candidateModel['alternateEmailId'], Validators.required ],
      candidateTechnicalSkills: [ this.candidateModel['candidateTechnicalSkills'] ],
    });

    this.id = 0;
    if (this.candidateModel['jobPostingId'] === 0) {
      this.candidateForm.controls['jobPostingId'].setValue(this.defaultOption, {onlySelf: true});
    }
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      this.candidateModel = this.candidateForm.value;
      this.candidateModel.createdBy = 1;
      this.candidateModel.modifiedBy = 1;
      // this.candidateModel.createdDate = '2018-06-06';

      this.candidateModel.candidateTechnicalSkills.forEach(element => {
        const numb = element as any;
        this.candidateSkill.push({
              technicalSkillID: numb,
              createdBy: 1,
              departmentID: 1,
              departmentName: '',
              modifiedBy: 1,
              technicalSkillName: ''
        });
      });

      this.candidateModel.candidateTechnicalSkills = this.candidateSkill;
      if (this.action === 'add') {
        this._candidateService.add(this.candidateModel)
          .subscribe(data => {
            this.initJobPostingModel();
            this.resetForm();
            this.loadCandidateGrid();
            this.goBack();
            this._toastr.success('Record Saved!', '');
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in CandidateComponent->onSubmit');
          }
        );
      } else if (this.action === 'edit') {
        this.candidateModel.jobPostingId = this.id;
        this._candidateService.update(this.candidateModel.jobPostingId, this.candidateModel)
          .subscribe(data => {
            this.initJobPostingModel();
            this.resetForm();
            this.loadCandidateGrid();
            this.goBack();
            this._toastr.success('Record Saved!', '');
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in CandidateComponent->onSubmit');
          }
        );
      }
    } else {
      this._customValidatorsService.validateAllFormFields(this.candidateForm);
    }
  }

  add() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.action = 'add';
    this.initJobPostingModel();
    this.createForm();
  }

  edit(id: number) {
    if (id) {
      this.action = 'edit';
      this._candidateService.getSingle(id)
      .subscribe((data: CandidateModel) => {
        // tslint:disable-next-line:no-debugger
        debugger;
          console.log(data);
          this.candidateModel = data;
          this.createForm();
          this.id = id;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
    }
  }

  remove(id: number) {
    if (id) {
      if (confirm('Are you sure you want to delete this item?')) {
        this._candidateService.delete(id)
        .subscribe((data: any) => {
            this.action = 'list';
            this.loadCandidateGrid();
            this._toastr.success('Record Deleted!', '');
          },
          error => () => {
            console.error('Error: $error');
            this._toastr.error(error, 'Error!');
          }
        );
      }
    }
  }

  goBack() {
    this.action = 'list';
  }

  configCandidateGrid() {
    this.cols = [
      { header: 'Sr.No'},
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'emailId', header: 'Email Id', },
      { field: 'primaryContactNumber', header: 'Contact No.' },
      { field: 'secondaryContactNumber', header: 'Alt. Contact No.' },
      { header: 'Action' }
  ];
  }

  loadCandidateGrid() {
    this._candidateService.getAll()
      .subscribe((data: CandidateModel[]) => {
        this.gridData = data;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  isFieldValid(field: string) {
    return this._customValidatorsService.isFieldValid(this.candidateForm, field);
  }

  displayFieldCss(field: string) {
    return this._customValidatorsService.displayFieldCss(this.candidateForm, field);
  }

  configDatePicker() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  initJobPostingModel() {
    this.candidateModel = {
      jobPostingId: 0,
      candidateId: 0,
      alternateEmailId: '',
      emailId: '',
      firstName: '',
      createdBy: 0,
      createdDate: null,
      modifiedBy: 0,
      modifiedDate: null,
      lastName: '',
      primaryContactNumber: '',
      secondaryContactNumber: '',
      files: null,
      candidateTechnicalSkills: [],
    };
  }

  // Initialize DropDown data
  initSettings() {
    this._jobPostingService.getAll()
      .subscribe((data: IJobPostingModel[]) => {
        this.jobpostingModel = data;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );

      this._technicalSkillsService.getAll()
      .subscribe((data: ITechnicalSkillsModel[]) => {
        this.candidateTechnicalSkills = data;

        this.candidateTechnicalSkills.forEach(element => {
          this.tSkills.push({label: element.technicalSkillName , value: element.technicalSkillID});
        });

        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  // candidateTechnicalSkills: ITechnicalSkillsModel[];

  // candidateModel: CandidateModel;
  // selCandidate: CandidateModel;
  // selCandidateFiles: CandidateFiles;
  // candidateForm: FormGroup;
  // isFormActive = false;
  // isedit = 'save';
  // files: any;
  // rowData: any;
  // jobPosting: any;


  // // Custom Grid variables declarations
  // filteredItems: CandidateModel[];
  // pages = 7;
  // pageSize = 15;
  // pageNumber = 0;
  // currentIndex = 1;
  // items: CandidateModel[];
  // pagesIndex: Array<number>;
  // pageStart = 1;
  // inputName = '';
  // inputLength = 7;
  // inputCity = '';
  // errors = '';
  // sortFirstNameOrder = false;
  // sortLastNameOrder = false;
  // sortOrder = false;


  // @ViewChild('fileInput') fileInput;

  // constructor(private fb: FormBuilder, private router: Router, public _customValidatorsService:
  //   CustomValidatorsService, private _candidateService: CandidateService, private httpService: HttpClient,
  //   private _jobPostingService: JobPostingService, private _Http: Http, private _toastr: ToastrService,
  //   private _paginationService: PaginationService
  // ) {

  // }

  // ngOnInit() {
  //   this.createForm();
  //   this.getCandidateData();
  //   this.getJobPostingData();
  // }

  // getCandidateData() {
  //   this._candidateService.getCandidate().subscribe(
  //     result => {
  //       this.rowData = result;
  //       this.filteredItems = this.rowData;
  //       this.init();
  //     },
  //     error => { },
  //     () => { }
  //   );
  // }
  // getJobPostingData() {
  //   this._jobPostingService.getAll().subscribe(
  //     result => {
  //       this.jobPosting = result;
  //     },
  //     error => {
  //     },
  //     () => {
  //     }
  //   );
  // }

  // ShowHideForm() {
  //   this.isFormActive = !this.isFormActive;
  //   this.isedit = 'save';
  //   this.candidateForm.reset();
  // }


  // onFileChange(event) {
  //   const fi = this.fileInput.nativeElement;
  //   if (fi.files && fi.files[0]) {
  //     const fileToUpload = fi.files[0];
  //     this.upload(fileToUpload)
  //       .subscribe(res => {
  //         console.log(res);
  //       });
  //   }
  // }

  // addFile(): void {
  //   const fi = this.fileInput.nativeElement;
  //   if (fi.files && fi.files[0]) {
  //     const fileToUpload = fi.files[0];
  //     this.upload(fileToUpload)
  //       .subscribe(res => {
  //         console.log(res);
  //       });
  //   }
  // }

  // upload(fileToUpload: any) {
  //   const input = new FormData();
  //   input.append('file', fileToUpload);

  //   this.selCandidateFiles.files = input;
  //   this.selCandidateFiles.id = '1';

  //   return this._Http
  //     .post('http://localhost:59393/api/Candidates/UploadFile?CandId=1', input);
  // }


  // createForm() {
  //   this.candidateForm = this.fb.group({
  //     candidateId: [''],
  //     jobPostingId: ['', Validators.required],
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     emailId: ['', Validators.required],
  //     alternateEmailId: ['', Validators.required],
  //     primaryContactNumber: ['', Validators.required],
  //     secondaryContactNumber: ['', Validators.required]
  //   });

  //   this.selCandidate = {} as CandidateModel;
  //   this.selCandidateFiles = {} as CandidateFiles;
  // }

  // editCandidate(candidateId: number) {
  //   this.isFormActive = this.isFormActive === false || this.isedit === 'Update' ? true : false;
  //   this.isedit = 'Update';
  //   this._candidateService.getCandidateById(candidateId)
  //     .subscribe((data: any) => {
  //       this.selCandidate = data;
  //     },
  //       error => () => {
  //         console.log('Error in onSubmit');
  //       }
  //     );
  // }


  // deleteCandidate(candidateId: number) {
  //   const isDelete = confirm('Are You sure want to delete this record.!');
  //   if (isDelete) {
  //     this._candidateService.deleteCandidateById(candidateId)
  //       .subscribe((data: any) => {
  //         this.selCandidate = data;
  //         this._toastr.success('Record Deleted!', '');
  //         this.Filter();
  //       },
  //         error => () => {
  //           console.log('Error in onSubmit');
  //         }
  //       );
  //   } else {
  //     this._toastr.error('Record Not deleted Deleted!', '');
  //   }
  // }

  // onSubmit() {
  //   this.selCandidate.createdBy = 1;
  //   this.selCandidate.modifiedBy = null;
  //   this.selCandidate.createdDate = '2018-05-23';
  //   this.selCandidate.modifiedDate = null;
  //   this.selCandidate.files = this.files;
  //   if (this.candidateForm.valid) {
  //     if (this.selCandidate) {
  //       this._candidateService.addEditCandidate(this.selCandidate)
  //         .subscribe(data => {
  //           this.isedit = 'save';
  //           this._toastr.success('Record Saved!', '');
  //           this.isFormActive = !this.isFormActive;
  //           this.candidateForm.reset();
  //           this.Filter();
  //         },
  //           error => () => {
  //             this._toastr.success(error, 'Error!');
  //             console.error('Error in Candidate->onSubmit' + error);
  //           }
  //         );
  //     } else {
  //       this.isedit = 'save';
  //     }
  //   } else {
  //     this._customValidatorsService.validateAllFormFields(this.candidateForm);
  //   }
  // }
  // goBack() {
  //   this.isFormActive = !this.isFormActive;
  // }

  // isFieldValid(field: string) {
  //   return this._customValidatorsService.isFieldValid(this.candidateForm, field);
  // }

  // displayFieldCss(field: string) {
  //   return this._customValidatorsService.displayFieldCss(this.candidateForm, field);
  // }

  // // Filter function
  // Filter() {
  //   this.filteredItems = [];
  //   if (this.inputName.length >= 3) {
  //     this._candidateService.getCandidateByQuery(this.inputName).subscribe((employee) => {
  //       this.rowData = employee;
  //       this.filteredItems = this.rowData;
  //       this.init();
  //     });
  //   } else {
  //     this._candidateService.getCandidate().subscribe((employee) => {
  //       this.rowData = employee;
  //       this.filteredItems = this.rowData;
  //       this.init();
  //     });
  //   }
  // }

  // init() {
  //   this.currentIndex = 1;
  //   this.pageSize = this.inputLength;
  //   this.pageStart = 1;
  //   this.pages = 7;
  //   this.filteredItems.reverse();
  //   // tslint:disable-next-line:radix
  //   this.pageNumber = parseInt('' + (this.filteredItems.length / this.pageSize));
  //   if (this.filteredItems.length % this.pageSize !== 0) {
  //     this.pageNumber++;
  //   }
  //   if (this.pageNumber < this.pages) {
  //     this.pages = this.pageNumber;
  //   }
  //   this.refreshItems();
  // }

  // sort(column) {
  //   switch (column) {
  //     case 'firstname': {
  //       if (this.sortFirstNameOrder) {
  //         this.filteredItems = this.filteredItems.sort((a, b) => a.firstName.localeCompare(b.firstName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortFirstNameOrder = !this.sortFirstNameOrder;
  //       } else {
  //         this.filteredItems = this.filteredItems.sort((a, b) => b.firstName.localeCompare(a.firstName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortFirstNameOrder = !this.sortFirstNameOrder;
  //       }
  //       break;
  //     }
  //     case 'lastname': {
  //       if (this.sortLastNameOrder) {
  //         this.filteredItems = this.filteredItems.sort((a, b) => a.lastName.localeCompare(b.lastName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortLastNameOrder = !this.sortLastNameOrder;
  //       } else {
  //         this.filteredItems = this.filteredItems.sort((a, b) => b.lastName.localeCompare(a.lastName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortLastNameOrder = !this.sortLastNameOrder;
  //       }
  //       break;
  //     }
  //     default: {
  //       console.log('Invalid');
  //       break;
  //     }
  //   }
  // }


  // // Code to change input for page records
  // ChangeinputLength() {
  //   this.pageSize = this.inputLength;
  //   this.init();
  // }



  // // Function to refresh Array
  // refreshItems() {
  //   this.items = this.filteredItems.slice((this.currentIndex - 1)
  //     * this.pageSize, (this.currentIndex) * this.pageSize);
  //   this.pagesIndex = this._paginationService.fillArray(this.pageStart, this.pages);
  // }

  // // Previous button code
  // prevPage() {
  //   if (this.currentIndex > 1) {
  //     this.currentIndex--;
  //   }
  //   if (this.currentIndex < this.pageStart) {
  //     this.pageStart = this.currentIndex;
  //   }
  //   this.refreshItems();
  // }

  // // Next Button Code
  // nextPage() {
  //   if (this.currentIndex < this.pageNumber) {
  //     this.currentIndex++;
  //   }
  //   if (this.currentIndex >= (this.pageStart + this.pages)) {
  //     this.pageStart = this.currentIndex - this.pages + 1;
  //   }

  //   this.refreshItems();
  // }

  // // periticluar page no selection function
  // setPage(index: number) {
  //   this.currentIndex = index;
  //   this.refreshItems();
  // }



}
