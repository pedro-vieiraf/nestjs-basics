import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber({}, { message: 'releaseYear must be a number' })
  releaseYear: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber({}, { message: 'rating must be a number' })
  @Min(0)
  @Max(10)
  rating: number;
}
