import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTagsDto {
  @IsNotEmpty({
    message: 'Required to fill in',
  })
  @IsNumber(
    {},
    {
      message: 'Value of id field must be a number',
    },
  )
  readonly id: number;

  @IsNotEmpty({
    message: 'Required to fill in',
  })
  @IsString({
    message: 'Value of text field must be a string',
  })
  readonly text: string;

  @IsNotEmpty({
    message: 'Required to fill in',
  })
  @IsArray({
    message: 'Value of tags field must be an array',
  })
  @IsString({
    each: true,
    message: 'Each element of tags field must be a string',
  })
  readonly tags: string[];

  @IsNotEmpty({
    message: 'Required to fill in',
  })
  @IsString({
    message: 'Value of date field must be a string',
  })
  readonly date: string;
}
