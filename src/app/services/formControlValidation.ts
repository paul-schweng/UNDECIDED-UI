import {FormControl, Validators} from "@angular/forms";

export class FormControlValidation {

  static hasFormValidationErrors(...formControls: FormControl[]): boolean {

    let invalid: boolean = false;


    formControls.forEach((formControl) => {

      if(formControl.hasValidator(Validators.required) && !formControl.value){
        invalid = true;
        return;
      }

      const controlErrors: any = formControl.errors;

      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(() => {
          invalid = true;
          return;
        });
      }
      return;
    });
    return invalid;
  }


}
