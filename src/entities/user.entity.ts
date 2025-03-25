import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Role } from 'src/enums/role.enum';
import { Team } from './team.entity';

@Unique(['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Team, (team) => team.manager, { cascade: true })
  @JoinColumn()
  team?: Team;
}
