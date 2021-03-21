import { FormGroup } from '@angular/forms';

export function PasswordConfirm(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.passwordConfirm) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordConfirm: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
