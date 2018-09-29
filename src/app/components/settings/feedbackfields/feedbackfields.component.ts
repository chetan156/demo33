import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ITechnicalSkillsModel } from '../../../core/models/TechnicalSkillsModel';
import { CustomValidatorsService } from '../../../core/services/validators/custom-validators.service';
import { TechnicalSkillsService } from '../../../core/services/technical-skills/technical-skills.service';
import { SettingsService } from '../../../core/services/settings/settings.service';
import { IFeedBackFieldsModel } from '../../../core/models/feedbackfieldsModel';
import { FeedbackfieldsService } from '../../../core/services/feedbackfields/feedbackfields.service';

@Component({
  selector: 'app-feedbackfields',
  templateUrl: './feedbackfields.component.html',
  styleUrls: ['./feedbackfields.component.css']
})
export class FeedbackfieldsComponent implements OnInit {

  // Declarations
  action: string;
  id = 0;
  feedBackFieldsModel: IFeedBackFieldsModel;
  gridData: IFeedBackFieldsModel[];
  alltechnicallSkillsModel: ITechnicalSkillsModel[];
  feedBackFieldsForm: FormGroup;
  defaultOption = '';
  cols: any[];
  // End: Declarations

  constructor(private _fb: FormBuilder,
    private _customValidatorsService: CustomValidatorsService,
    private _technicalSkillsService: TechnicalSkillsService,
    private _feedBackFieldsService: FeedbackfieldsService,
    private _toastr: ToastrService) {
    this.initFeedBackFieldsModel();
    this.createForm();
  }

  initFeedBackFieldsModel() {
    this.feedBackFieldsModel = {
      feedbackFieldId: 0,
      feedbackFieldName: '',
      technicalSkillID: 0,
      technicalSkillName: '',
      createdBy: 0,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }

  ngOnInit() {
    this.action = 'list';
    this.configFeedbackFieldsGrid();
    this.loadFeedbackFieldsGrid();
    this.initSettings();
  }

  configFeedbackFieldsGrid() {
    this.cols = [
      { header: 'Sr.No' },
      { field: 'feedbackFieldName', header: 'Feedback Field Name' },
      { field: 'technicalSkillName', header: 'Technical Skill Name' },
      { header: 'Action' }
    ];
  }

  createForm() {
    this.feedBackFieldsForm = this._fb.group({
      feedbackFieldName: [this.feedBackFieldsModel['feedbackFieldName'], Validators.required],
      technicalSkillID: [this.feedBackFieldsModel['technicalSkillID'], Validators.required]
    });

    this.id = 0;
    if (this.feedBackFieldsModel['technicalSkillID'] === 0) {
      this.feedBackFieldsForm.controls['technicalSkillID'].setValue(this.defaultOption, { onlySelf: true });
    }
  }

  onSubmit() {
    if (this.feedBackFieldsForm.valid) {
      this.feedBackFieldsModel = this.feedBackFieldsForm.value;
      this.feedBackFieldsModel.createdBy = 1;
      this.feedBackFieldsModel.modifiedBy = 1;

      if (this.action === 'add') {
        this._feedBackFieldsService.add(this.feedBackFieldsModel)
          .subscribe(data => {
            this.initFeedBackFieldsModel();
            this.resetForm();
            this.loadFeedbackFieldsGrid();
            this._toastr.success('Record Saved!', '');
            this.goBack();
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in FeedBackFieldsComponent->onSubmit');
          }
        );
      } else if (this.action === 'edit') {
        this.feedBackFieldsModel.feedbackFieldId = this.id;
        this._feedBackFieldsService
          .update(this.feedBackFieldsModel.feedbackFieldId, this.feedBackFieldsModel)
          .subscribe(data => {
            this.initFeedBackFieldsModel();
            this.resetForm();
            this.loadFeedbackFieldsGrid();
            this.action = 'list';
            this._toastr.success('Record Saved!', '');
            this.goBack();
          },
          error => (err) => {
            this._toastr.success(err, 'Error!');
            console.error('Error in FeedBackFieldsComponent->onSubmit');
          }
        );
      }
    } else {
      this._customValidatorsService.validateAllFormFields(this.feedBackFieldsForm);
    }
  }

  loadFeedbackFieldsGrid() {
    this._feedBackFieldsService.getAll()
      .subscribe((data: IFeedBackFieldsModel[]) => {
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
    this.initFeedBackFieldsModel();
    this.createForm();
  }

  edit(id: number) {
    if (id) {
      this.action = 'edit';
      this._feedBackFieldsService.getSingle(id)
        .subscribe((data: IFeedBackFieldsModel) => {
          this.feedBackFieldsModel = data;
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
    this.feedBackFieldsModel.feedbackFieldName = '';
    this.feedBackFieldsModel.technicalSkillID = 0;
    this.id = 0;
  }

  isFieldValid(field: string) {
    return this._customValidatorsService.isFieldValid(this.feedBackFieldsForm, field);
  }

  displayFieldCss(field: string) {
    return this._customValidatorsService.displayFieldCss(this.feedBackFieldsForm, field);
  }

  // Initialize TechnicalSkills DropDown data
  initSettings() {
    this._technicalSkillsService.getAll()
      .subscribe((data: ITechnicalSkillsModel[]) => {
        this.alltechnicallSkillsModel = data;
      },
        error => () => {
          console.error('Error: $error');
          this._toastr.error(error, 'Error!');
        }
      );
  }

}
