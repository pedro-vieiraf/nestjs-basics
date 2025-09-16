import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(CreateUserDto: CreateUserDto) {
    const user = this.usersRepository.create(CreateUserDto);
    return this.usersRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async findOneOptional(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
}
