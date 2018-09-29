import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserViewModel } from '../../core/models/userViewModel';
import { LoginService } from '../../core/services/login/login.service';
import { EncryptionService } from '../../core/encryption/encryption';
import { CustomValidatorsService } from '../../core/services/validators/custom-validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fullImagePath = '../../assets/images/bg-01.jpg';
  currentUser: UserViewModel;
  beforeCurrentUser: any;
  loginForm: FormGroup;
  EncUserNameVal: any;
  EncUserName: any;
  EncUserIdKey: any;
  EncUserRoleKey: any;
  EncUserIdVal: any;
  EncUserRoleVal: any;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              public encryptionSrv: EncryptionService,
              public _customValidatorsService: CustomValidatorsService ) {
  }

  ngOnInit() {
    localStorage.clear();
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      EmailId: ['',  [Validators.required, Validators.email ]],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formModel = this.loginForm.value;
    this.currentUser = {
      EmailId: formModel.EmailId,
      Password: formModel.Password,
      Token: '',
      role: '',
      userId: '',
      firstName: '',
      lastName: ''
    };

   if (this.currentUser.EmailId ==='admin' && this.currentUser.Password ==='admin')
        this.currentUser =  this.beforeCurrentUser.loginUser;
        this.EncUserIdKey = this.encryptionSrv.encript('UserId').toString();
        this.EncUserRoleKey = this.encryptionSrv.encript('Role').toString();
        this.EncUserIdVal = this.encryptionSrv.encript(this.currentUser.userId).toString();
        this.EncUserRoleVal = this.encryptionSrv.encript(this.currentUser.role).toString();

        localStorage.setItem(this.EncUserIdKey, this.EncUserIdVal);
        localStorage.setItem(this.EncUserRoleKey,  this.EncUserRoleVal);
        const userName = this.currentUser.firstName.concat(' ' + this.currentUser.lastName);
        localStorage.setItem('Name', userName);

        this.router.navigate(['dashboard']);
       
  }

}
