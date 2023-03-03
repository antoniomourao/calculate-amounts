import { AbstractControl } from "@angular/forms";

export class CustomNumericValidator {
  /**
   * Validates if control value is a numeric
   *
   * @param control
   * @returns
   */
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { numeric: true };

    return null;
  }
}
