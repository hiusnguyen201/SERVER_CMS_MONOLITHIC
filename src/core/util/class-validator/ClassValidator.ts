import { Optional } from '@core/type/CommonType';
import { validate, ValidationError } from 'class-validator';

export type ClassValidatorDetails = {
  context: string;
  errors: ClassValidatorErrors[];
};

export type ClassValidatorErrors = {
  property: string;
  message: string[];
};

export class ClassValidator {
  public static async validate<TTarget extends object>(target: TTarget, context?: string) {
    let details: Optional<ClassValidatorDetails>;

    const errors: ValidationError[] = await validate(target);

    if (errors.length > 0) {
      details = {
        context: context || this.constructor.name,
        errors: [],
      };

      errors.map((err) => {
        details?.errors.push({
          property: err.property,
          message: err.constraints ? Object.values(err.constraints) : [],
        });
      });
    }

    return details;
  }
}
