import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  matches: number;

  @OneToOne(() => Player, (player) => player.statistics)
  player: Player;
}
