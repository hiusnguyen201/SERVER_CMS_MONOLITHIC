import { Code } from '@core/code/Code';
import { Exception } from '@core/exception/Exception';
import { ClassValidator } from '@core/util/class-validator/ClassValidator';

export class ValidatableAdapter {
  public async validate(): Promise<void> {
    const details = await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({ code: Code.ENTITY_VALIDATION_ERROR, data: details });
    }
  }
}
