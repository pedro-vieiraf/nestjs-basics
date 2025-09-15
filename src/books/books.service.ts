import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: string): Promise<Book | null> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const updatedLog = await this.booksRepository.update(id, updateBookDto);

    if (updatedLog.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.booksRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const deleteLog = await this.booksRepository.delete(id);
    if (deleteLog.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
