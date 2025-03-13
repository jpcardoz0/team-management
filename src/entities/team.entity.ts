import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { getTodayDate } from 'src/utils/dateFunctions';

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

  @Column({ default: getTodayDate() })
  foundationDate: string;
}
