import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Form } from '@angular/forms';
// import { map } from 'rxjs/operators';

@Injectable()
export class CustomValidatorsService {

    constructor() { }

    vaildEmail(formControl: FormControl): ValidationErrors {
        const email = formControl.value;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let isValid = true;
        const message = {
            'vaildEmail': {
                'message': 'Should be valid email.'
            }
        };
        
        if (reg.test(email)) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    ageValidate(formControl: FormControl): ValidationErrors {
        const num = formControl.value;
        const numlength = num.length;
        const isValid = !isNaN(num) && num >= 18 && num <= 85;
        const message = {
            'age': {
                'message': 'The age must be a valid number between 18 and 85'
            }
        };
        return isValid ? null : message;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }

}
