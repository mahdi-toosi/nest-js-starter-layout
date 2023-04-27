import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PUBLIC_ROUTE_KEY } from '../decorators/PublicRoute'
import { Reflector } from '@nestjs/core'
import type { ExecutionContext } from '@nestjs/common'

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}
	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (isPublic) {
			return true
		}
		return super.canActivate(context)
	}
}
