import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}
  transform(value: unknown) {
    try {
      const parsed = this.schema.parse(value);
      return parsed;
    } catch (error) {
      throw new BadRequestException(error, 'validation failed');
    }
  }
}
