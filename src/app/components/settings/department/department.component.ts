import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';


import { DepartmentModel } from '../../../core/models/departmentModel';
import { CustomValidatorsService } from '../../../core/services/validators/custom-validators.service';
import { DepartmentService } from '../../../core/services/department/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  action: string;
  id = 0;
  minDate: Date;
  departmentModel: DepartmentModel;
  gridData: DepartmentModel[];
  allPositionModel: DepartmentModel[];
  departmentForm: FormGroup;
  defaultOption = '';
  cols: any[];
  // End: Declarations

  constructor(private _fb: FormBuilder,
              private _customValidatorsService: CustomValidatorsService,
              private _departmentService: DepartmentService,
              private _toastr: ToastrService) {
    this.initJobPostingModel();
    this.createForm();
  }

  ngOnInit() {
    this.action = 'list';
    this.configJobPostingGrid();
    this.loadJobPostingGrid();
  }

  createForm() {
    this.departmentForm = this._fb.group({
      departmentName: [ this.departmentModel['departmentName'], Validators.required ],
      departmentDescription: [ this.departmentModel['departmentDescription'], Validators.required ]
    });

    this.id = 0;
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.departmentModel = this.departmentForm.value;
      this.departmentModel.createdBy = 1;
      this.departmentModel.createdDate = '2018-06-06';
      this.departmentModel.modifiedBy = 1;

      if (this.action === 'add') {
        this._departmentService.add(this.departmentModel)
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
        this.departmentModel.departmentId = this.id;
        this._departmentService.update(this.departmentModel.departmentId, this.departmentModel)
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
      this._customValidatorsService.validateAllFormFields(this.departmentForm);
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
      this._departmentService.getSingle(id)
      .subscribe((data: DepartmentModel) => {
          this.departmentModel = data;
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
        this._departmentService.delete(id)
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
    this.departmentModel.departmentId = 0;
    this.departmentModel.departmentName = '';
    this.departmentModel.departmentDescription = '';
    this.departmentModel.createdDate = '';
    this.departmentModel.modifiedBy = 0;
    this.departmentModel.createdDate = null;
    this.departmentModel.modifiedDate = null;
    this.id = 0;
  }

  configJobPostingGrid() {
    this.cols = [
      { header: 'Sr.No'},
      { field: 'departmentName', header: 'Department' },
      { field: 'departmentDescription', header: 'Description' },
      { header: 'Action' }
  ];
  }

  loadJobPostingGrid() {
    this._departmentService.getAll()
      .subscribe((data: DepartmentModel[]) => {
        this.gridData = data;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  isFieldValid(field: string) {
    return this._customValidatorsService.isFieldValid(this.departmentForm, field);
  }

  displayFieldCss(field: string) {
    return this._customValidatorsService.displayFieldCss(this.departmentForm, field);
  }

  configDatePicker() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  initJobPostingModel() {
    this.departmentModel = {
      departmentId: 0,
      departmentName: '',
      departmentDescription: '',
      createdBy: 0,
      modifiedBy: 0,
      createdDate: null,
      modifiedDate: null
    };
  }

}
