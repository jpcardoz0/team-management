import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthenticatedUser } from '../dto/auth.user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser;

    if (!user) {
      return false;
    }

    if (requiredRoles.includes(Role.ADMIN)) {
      return user.role === Role.ADMIN;
    }

    if (requiredRoles.includes(Role.MANAGER) && user.role === Role.MANAGER) {
      const teamId = request.params.teamId;
      return teamId ? user.team?.id === Number(teamId) : false;
    }

    return requiredRoles.includes(user.role);
  }
}
