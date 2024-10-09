import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!requiredRoles) {
        return true; // If no roles are defined, allow access
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user; // Assuming user is attached to request by JWT strategy
  
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Forbidden resource');
      }
  
      return true;
    }
  }
  