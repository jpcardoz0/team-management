import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Player, (player) => player.statistic, {
    onDelete: 'CASCADE',
  })
  player: Player;
}
