import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { getTodayDate } from 'src/utils/dateFunctions';
import { Player } from './player.entity';

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

  @OneToMany(() => Player, (player) => player.team, { cascade: true })
  player: Player[];
}
