import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// id, title, director, releaseYear, rating
@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  releaseYear: number;

  @Column('float')
  rating: number;
}
