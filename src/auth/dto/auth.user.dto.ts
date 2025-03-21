import { Role } from 'src/enums/role.enum';

export class AuthenticatedUser {
  id: number;
  username: string;
  role: Role;
  team?: { id: number };
}
