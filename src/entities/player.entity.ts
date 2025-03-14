import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

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

  @ManyToOne(() => Team, (team) => team.player, { onDelete: 'CASCADE' })
  team: Team;
}
