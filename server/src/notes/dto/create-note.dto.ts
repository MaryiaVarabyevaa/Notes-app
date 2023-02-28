import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty({
    message: 'Required to fill in',
  })
  @IsNumber(
    {},
    {
      message: 'queueNumber field must be a number',
    },
  )
  readonly queueNumber: number;

  @IsNotEmpty({
    message: 'Required to fill in',
  })
  @IsString({
    message: 'Color field must be a string',
  })
  readonly color: string;

  @IsNotEmpty({
    message: 'Required to fill in',
  })
  @IsString({
    message: 'Date field must be a string',
  })
  readonly date: string;
}
