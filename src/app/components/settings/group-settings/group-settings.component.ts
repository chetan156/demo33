import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CustomValidatorsService } from '../../../core/services/validators/custom-validators.service';
import { SettingsService } from '../../../core/services/settings/settings.service';
import { ISettingsModel } from '../../../core/models/settingsModel';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit {
  // Declarations
  technicalSkillsModel: ISettingsModel;
  gridData: ISettingsModel[];
  defaultOption = '';
  cols: any[];
  distinctGroupNames: string[];
  // End: Declarations

  constructor(private _fb: FormBuilder,
    private _customValidatorsService: CustomValidatorsService,
    private _settingsService: SettingsService,
    private _toastr: ToastrService) {
  }

  ngOnInit() {
    this.configGroupSettingsGrid();
    this.loadJobPostingGrid();
    this.initSettings();
  }

  configGroupSettingsGrid() {
    this.cols = [
      { header: 'Sr.No' },
      { field: 'groupName', header: 'Group Name' },
      { field: 'text', header: 'Text' },
      { field: 'value', header: 'Value' },
      { field: 'description', header: 'Description' }
    ];
  }

  loadJobPostingGrid() {
    this._settingsService.getAll()
      .subscribe((data: ISettingsModel[]) => {
        this.gridData = data;
        console.log(data);
      },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  // Initialize Distict Group Names DropDown data
  initSettings() {
    this._settingsService.getDistinctGroups()
      .subscribe((data) => {
        console.log(data);
        this.distinctGroupNames = data;
      },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

  getGroupNameDetails(groupName) {
    this._settingsService.getAll(groupName)
      .subscribe((data) => {
        this.gridData = data;
      },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }
}
