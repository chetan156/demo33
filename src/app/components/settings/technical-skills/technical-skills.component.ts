import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ITechnicalSkillsModel } from '../../../core/models/TechnicalSkillsModel';
import { CustomValidatorsService } from '../../../core/services/validators/custom-validators.service';
import { TechnicalSkillsService } from '../../../core/services/technical-skills/technical-skills.service';
import { SettingsService } from '../../../core/services/settings/settings.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DepartmentModel } from '../../../core/models/departmentModel';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.css']
})
export class TechnicalSkillsComponent implements OnInit {

  // Declarations
  action: string;
  id = 0;
  technicalSkillsModel: ITechnicalSkillsModel;
  gridData: ITechnicalSkillsModel[];
  allDepartmentsModel: DepartmentModel[];
  technicalSkillsForm: FormGroup;
  defaultOption = '';
  cols: any[];
  // End: Declarations

  constructor(private _fb: FormBuilder,
    private _customValidatorsService: CustomValidatorsService,
    private _technicalSkillsService: TechnicalSkillsService,
    private _departmentService: DepartmentService,
    private _toastr: ToastrService) {
    this.initTechnicalSkillsModel();
    this.createForm();
}

  initTechnicalSkillsModel() {
    this.technicalSkillsModel = {
      technicalSkillID: 0,
      technicalSkillName: '',
      departmentID: 0,
      departmentName: '',
      createdBy: 0,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }

  ngOnInit() {
    this.action = 'list';
    this.configJobPostingGrid();
    this.loadJobPostingGrid();
    this.initSettings();
  }

  configJobPostingGrid() {
    this.cols = [
      { header: 'Sr.No'},
      { field: 'technicalSkillName', header: 'Technical Skill Name' },
      { field: 'departmentName', header: 'Department' },
      { header: 'Action' }
    ];
  }

  createForm() {
    this.technicalSkillsForm = this._fb.group({
      technicalSkillName: [ this.technicalSkillsModel['technicalSkillName'], Validators.required ],
      departmentID: [ this.technicalSkillsModel['departmentID'], Validators.required ]
    });

    this.id = 0;
    if (this.technicalSkillsModel['departmentID'] === 0) {
      this.technicalSkillsForm.controls['departmentID'].setValue(this.defaultOption, {onlySelf: true});
    }
  }

  onSubmit() {
    if (this.technicalSkillsForm.valid) {
      this.technicalSkillsModel = this.technicalSkillsForm.value;
      this.technicalSkillsModel.createdBy = 1;
      this.technicalSkillsModel.modifiedBy = 1;

      if (this.action === 'add') {
        this._technicalSkillsService.add(this.technicalSkillsModel)
          .subscribe(data => {
            this.initTechnicalSkillsModel();
            this.resetForm();
            this.loadJobPostingGrid();
            this._toastr.success('Record Saved!', '');
            this.goBack();
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in TechnicalSkillsComponent->onSubmit');
          }
        );
      } else if (this.action === 'edit') {
        this.technicalSkillsModel.technicalSkillID = this.id;
        this._technicalSkillsService
          .update(this.technicalSkillsModel.technicalSkillID, this.technicalSkillsModel)
          .subscribe(data => {
            this.initTechnicalSkillsModel();
            this.resetForm();
            this.loadJobPostingGrid();
            this.action = 'list';
            this._toastr.success('Record Saved!', '');
            this.goBack();
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in TechnicalSkillsComponent->onSubmit');
          }
        );
      }
    } else {
      this._customValidatorsService.validateAllFormFields(this.technicalSkillsForm);
    }
  }

  loadJobPostingGrid() {
    this._technicalSkillsService.getAll()
      .subscribe((data: ITechnicalSkillsModel[]) => {
        this.gridData = data;
        console.log(data);
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  add() {
    this.action = 'add';
    this.initTechnicalSkillsModel();
    this.createForm();
  }

  edit(id: number) {
    if (id) {
      this.action = 'edit';
      this._technicalSkillsService.getSingle(id)
      .subscribe((data: ITechnicalSkillsModel) => {
          this.technicalSkillsModel = data;
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

  goBack() {
    this.action = 'list';
  }

  resetForm() {
    this.technicalSkillsModel.technicalSkillName = '';
    this.technicalSkillsModel.departmentID = 0;
    this.id = 0;
  }

  isFieldValid(field: string) {
    return this._customValidatorsService.isFieldValid(this.technicalSkillsForm, field);
  }

  displayFieldCss(field: string) {
    return this._customValidatorsService.displayFieldCss(this.technicalSkillsForm, field);
  }

  // Initialize Departments DropDown data
  initSettings() {
    this._departmentService.getDepartment()
      .subscribe((data: DepartmentModel[]) => {
        this.allDepartmentsModel = data;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }
}
