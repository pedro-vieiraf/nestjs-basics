import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

/**
 * DTO para criar um novo livro
 */
export class CreateBookDto {
  /**
   * Título do livro
   * @example "O Senhor dos Anéis"
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * Autor do livro
   * @example "J.R.R. Tolkien"
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  author: string;

  /**
   * Ano de lançamento (apenas números)
   * @example 1954
   */
  @IsDefined()
  @IsNotEmpty()
  @IsNumber({}, { message: 'releaseYear must be a number' })
  releaseYear: number;

  /**
   * Avaliação do livro (0 a 10)
   * @example 9.5
   */
  @IsDefined()
  @IsNotEmpty()
  @IsNumber({}, { message: 'rating must be a number' })
  @Min(0)
  @Max(10)
  rating: number;
}
