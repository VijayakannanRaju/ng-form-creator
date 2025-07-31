// src/app/utils/form-validators.ts
import { Validators, ValidatorFn } from '@angular/forms';

export interface ValidatorOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  email?: boolean;
  pattern?: string;
}

/**
 * Generates a list of Angular validators based on metadata options.
 */
export function buildValidators(options: ValidatorOptions): ValidatorFn[] {
  const validators: ValidatorFn[] = [];

  if (options.required) {
    validators.push(Validators.required);
  }

  if (options.minLength !== undefined) {
    validators.push(Validators.minLength(options.minLength));
  }

  if (options.maxLength !== undefined) {
    validators.push(Validators.maxLength(options.maxLength));
  }

  if (options.min !== undefined) {
    validators.push(Validators.min(options.min));
  }

  if (options.max !== undefined) {
    validators.push(Validators.max(options.max));
  }

  if (options.email) {
    validators.push(Validators.email);
  }

  if (options.pattern) {
    validators.push(Validators.pattern(options.pattern));
  }

  return validators;
}
