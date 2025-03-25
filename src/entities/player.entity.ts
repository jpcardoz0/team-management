import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Team } from './team.entity';
import { Statistic } from './statistic.entity';

@Unique(['name'])
@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  nationality: string;

  @Column()
  dob: string;

  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  team?: Team | null;

  @OneToOne(() => Statistic, (statistic) => statistic.player, { cascade: true })
  @JoinColumn()
  statistics?: Statistic | null;
}
