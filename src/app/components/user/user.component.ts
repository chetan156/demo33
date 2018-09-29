import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { IUserModel } from '../../core/models/userModel';
import { DepartmentModel } from '../../core/models/departmentModel';
import { ISettingsModel } from '../../core/models/settingsModel';
import { CustomValidatorsService } from '../../core/services/validators/custom-validators.service';
import { UserService } from '../../core/services/user/user.service';
import { DepartmentService } from '../../core/services/department/department.service';
import { SettingsService } from '../../core/services/settings/settings.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Declarations
  action: string;
  id = 0;
  minDate: Date;
  userModel: IUserModel;
  gridData: IUserModel[];
  allDepartmentModel: DepartmentModel[];
  allPositionModel: ISettingsModel[];
  allRoleModel: ISettingsModel[];
  userForm: FormGroup;
  defaultOption = '';
  cols: any[];
  // End: Declarations

  constructor(private _fb: FormBuilder,
              private _customValidatorsService: CustomValidatorsService,
              private _userService: UserService,
              private _departmentService: DepartmentService,
              private _settingsService: SettingsService,
              private _toastr: ToastrService) {
    this.configDatePicker();
    this.initSettings();
    this.initUserModel();
    this.createForm();
  }

  ngOnInit() {
    this.action = 'list';
    this.configUserGrid();
    this.loadUserGrid();
  }

  resetForm() {
    this.userModel.createdBy = 0;
    this.userModel.departmentId = 0;
    this.userModel.designationId = 0;
    this.userModel.emailId = '';
    this.userModel.firstName = '';
    this.userModel.gender = '';
    this.userModel.isActive = false;
    this.userModel.lastName = '';
    this.userModel.password = '';
    this.userModel.primaryContactNumber = '';
    this.userModel.role = '';
    this.userModel.roleId = 0;
    this.userModel.secondaryContactNumber = '';
    this.userModel.skypeId = '';
    this.userModel.userId = 0;
    this.id = 0;
  }

  createForm() {
    this.userForm = this._fb.group({
      userId: [ this.userModel['userId'] ],
      emailId: [ this.userModel['emailId'], Validators.required ],
      firstName: [ this.userModel['firstName'], Validators.required ],
      lastName: [ this.userModel['lastName'], Validators.required ],
      gender: [ this.userModel['gender'], Validators.required ],
      isActive: [ this.userModel['isActive'] ],
      password: [ this.userModel['password'],
      (this.action === 'add' ? Validators.required : Validators.nullValidator )  ],
      primaryContactNumber: [ this.userModel['primaryContactNumber'], Validators.required ],
      secondaryContactNumber: [ this.userModel['secondaryContactNumber'] ],
      skypeId: [ this.userModel['skypeId'], Validators.required ],
      departmentId: [ this.userModel['departmentId'], Validators.required ],
      designationId: [ this.userModel['designationId'], Validators.required ],
      roleId: [ this.userModel['roleId'], Validators.required ]
    });

    this.id = 0;
    if (this.userModel['roleId'] === 0) {
      this.userForm.controls['roleId'].setValue(this.defaultOption, {onlySelf: true});
    }
  }

  configUserGrid() {
    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'emailId', header: 'Email Id', },
      { field: 'skypeId', header: 'Skype Id' },
      { field: 'primaryContactNumber', header: 'Contact No.' },
      { field: 'isActive', header: 'Is Active' },
      { header: 'Action' }
    ];
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userModel = this.userForm.value;
      this.userModel.gender = ((this.userModel.gender.toLocaleLowerCase() === 'male') ? '1' : '2');
      this.userModel.createdBy = 1;

      if (this.action === 'add') {
        this._userService.add(this.userModel)
          .subscribe(data => {
            this.initUserModel();
            this.resetForm();
            this.loadUserGrid();
            this.goBack();
            this._toastr.success('Record Saved!', '');
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in UserComponent->onSubmit');
          }
        );
      } else if (this.action === 'edit') {
        this.userModel.userId = this.id;
        this._userService.update(this.userModel.userId, this.userModel)
          .subscribe(data => {
            this.initUserModel();
            this.resetForm();
            this.loadUserGrid();
            this.goBack();
            this._toastr.success('Record Saved!', '');
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in UserComponent->onSubmit');
          }
        );
      }
    } else {
      this._customValidatorsService.validateAllFormFields(this.userForm);
    }
  }

  add() {
    this.action = 'add';
    this.initUserModel();
    this.createForm();
  }

  edit(id: number) {
    if (id) {
      this.action = 'edit';
      this._userService.getSingle(id)
      .subscribe((data: IUserModel) => {
          this.userModel = data;
          this.userModel.gender = ((this.userModel.gender.toString() === '1') ? 'male' : 'female');
          console.log(this.userModel);
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
        this._userService.delete(id)
        .subscribe((data: any) => {
            this.action = 'list';
            this.loadUserGrid();
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

  loadUserGrid() {
    this._userService.getAll()
      .subscribe((data: IUserModel[]) => {
        this.gridData = data;
        },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  isFieldValid(field: string) {
    return this._customValidatorsService.isFieldValid(this.userForm, field);
  }

  displayFieldCss(field: string) {
    return this._customValidatorsService.displayFieldCss(this.userForm, field);
  }

  configDatePicker() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  initUserModel() {
    this.userModel = {
      departmentId: 0,
      designationId: 0,
      emailId: '',
      firstName: '',
      gender: '',
      isActive: false,
      lastName: '',
      password: '',
      primaryContactNumber: '',
      role: '',
      roleId: 0,
      secondaryContactNumber: '',
      skypeId: '',
      userId: 0,
      createdBy: 0
    };
  }

    // Initialize DropDown data
    initSettings() {
      this._departmentService.getAll()
        .subscribe((data: DepartmentModel[]) => {
          this.allDepartmentModel = data;
          },
          error => () => {
            console.error('Error: $error');
            this._toastr.error(error, 'Error!');
          }
        );

        let groupName = 'position';
        this._settingsService.getAll(groupName)
        .subscribe((data: ISettingsModel[]) => {
          this.allPositionModel = data;
          },
          error => () => {
            console.error('Error: $error');
            this._toastr.error(error, 'Error!');
          }
        );

        groupName = 'roles';
        this._settingsService.getAll(groupName)
        .subscribe((data: ISettingsModel[]) => {
          this.allRoleModel = data;
          },
          error => () => {
            console.error('Error: $error');
            this._toastr.error(error, 'Error!');
          }
        );
    }

}
