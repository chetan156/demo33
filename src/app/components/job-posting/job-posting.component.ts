import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { IJobPostingModel } from '../../core/models/jobpostingModel';
import { IPositionModel } from '../../core/models/positionModel';
import { CustomValidatorsService } from '../../core/services/validators/custom-validators.service';
import { JobPostingService } from '../../core/services/job-posting/job-posting.service';
import { SettingsService } from '../../core/services/settings/settings.service';
import { ISettingsModel } from '../../core/models/settingsModel';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit {

  // Declarations
  action: string;
  id = 0;
  minDate: Date;
  jobPostingModel: IJobPostingModel;
  gridData: IJobPostingModel[];
  allPositionModel: ISettingsModel[];
  jobPostingForm: FormGroup;
  defaultOption = '';
  cols: any[];
  // End: Declarations

  constructor(private _fb: FormBuilder,
              private _customValidatorsService: CustomValidatorsService,
              private _jobPostingService: JobPostingService,
              private _settingsService: SettingsService,
              private _toastr: ToastrService) {
    this.configDatePicker();
    this.initJobPostingModel();
    this.createForm();
  }

  ngOnInit() {
    this.action = 'list';
    this.configJobPostingGrid();
    this.loadJobPostingGrid();
    this.initSettings();
  }

  createForm() {
    this.jobPostingForm = this._fb.group({
      jobCode: [ this.jobPostingModel['jobCode'], Validators.required ],
      jobDescription: [ this.jobPostingModel['jobDescription'], Validators.required ],
      positionId: [ this.jobPostingModel['positionId'], Validators.required ],
      expiryDate: [ this.jobPostingModel['expiryDate'], Validators.required ],
      isExpired: [ this.jobPostingModel['isExpired'], Validators.required ]
    }); 
  }

  onSubmit() {
    if (this.jobPostingForm.valid) {
      this.jobPostingModel = this.jobPostingForm.value;
      this.jobPostingModel.createdBy = 1;
      this.jobPostingModel.modifiedBy = 1;

      console.log(this.jobPostingModel);

      if (this.action === 'add') {
        this._jobPostingService.add(this.jobPostingModel)
          .subscribe(data => {
            this.initJobPostingModel();
            this.resetForm();
            this.loadJobPostingGrid();
            this.goBack();
            this._toastr.success('Record Saved!', '');
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in JobPostingComponent->onSubmit');
          }
        );

      } else if (this.action === 'edit') {
        this.jobPostingModel.jobPostingId = this.id;
        this._jobPostingService.update(this.jobPostingModel.jobPostingId, this.jobPostingModel)
          .subscribe(data => {
            this.initJobPostingModel();
            this.resetForm();
            this.loadJobPostingGrid();
            this.goBack();
            this._toastr.success('Record Saved!', '');
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in JobPostingComponent->onSubmit');
          }
        );
      }

    } else {
      this._customValidatorsService.validateAllFormFields(this.jobPostingForm);
    }
  }

  add() {
    this.action = 'add';
    this.initJobPostingModel();
    this.createForm();
  }

  edit(id: number) {
    if (id) {
      this.action = 'edit';
      this._jobPostingService.getSingle(id)
      .subscribe((data: IJobPostingModel) => {
          this.jobPostingModel = data;
          const expiryDate = this.jobPostingModel.expiryDate;
          this.jobPostingModel.expiryDate = new Date(expiryDate);
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
        this._jobPostingService.delete(id)
        .subscribe((data: any) => {
            this.action = 'list';
            this.loadJobPostingGrid();
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

  resetForm() {
    this.jobPostingModel.jobPostingId = 0;
    this.jobPostingModel.jobCode = '';
    this.jobPostingModel.jobDescription = '';
    this.jobPostingModel.position = '';
    this.jobPostingModel.positionId = 0;
    this.jobPostingModel.expiryDate = null;
    this.jobPostingModel.isExpired = false;
    this.id = 0;
  }

  configJobPostingGrid() {
    this.cols = [
      { header: 'Sr.No'},
      { field: 'jobCode', header: 'Job Code' },
      { field: 'jobDescription', header: 'Job Description' },
      { field: 'position', header: 'Position', },
      { field: 'expiryDate', header: 'Expiry Date' },
      { field: 'isExpired', header: 'Is Expired' },
      { header: 'Action' }
  ];
  }

  loadJobPostingGrid() {
    this._jobPostingService.getAll()
      .subscribe((data: IJobPostingModel[]) => {
        this.gridData = data;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  isFieldValid(field: string) {
    return this._customValidatorsService.isFieldValid(this.jobPostingForm, field);
  }

  displayFieldCss(field: string) {
    return this._customValidatorsService.displayFieldCss(this.jobPostingForm, field);
  }

  configDatePicker() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  initJobPostingModel() {
    this.jobPostingModel = {
      jobPostingId: 0,
      jobCode: '',
      jobDescription: '',
      position: '',
      positionId: 0,
      createdBy: 0,
      createdDate: null,
      modifiedBy: 0,
      modifiedDate: null,
      expiryDate: null,
      isExpired: false
    };
  }

  // Initialize DropDown data
  initSettings() {
    const groupName = 'position';
    this._settingsService.getAll(groupName)
      .subscribe((data: ISettingsModel[]) => {
        this.allPositionModel = data;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

}
