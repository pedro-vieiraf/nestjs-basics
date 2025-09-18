import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

/**
 * DTO para atualizar um livro (parcial, todos os campos opcionais)
 */
export class UpdateBookDto extends PartialType(CreateBookDto) {}
