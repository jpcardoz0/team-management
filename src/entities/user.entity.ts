import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Team } from './team.entity';
import { Role } from 'src/enums/role.enum';

@Unique(['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.GUEST })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Team, (team) => team.manager, { nullable: true })
  @JoinColumn()
  team: Team;
}
