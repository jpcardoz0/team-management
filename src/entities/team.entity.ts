import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
@Unique(['stadium'])
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  stadium: string;

  @Column()
  location: string;

  @Column()
  foundationDate: string;
}
