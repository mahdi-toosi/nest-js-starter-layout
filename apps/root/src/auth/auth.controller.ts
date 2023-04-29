import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request } from 'express'
import { PublicRoute } from './decorators/PublicRoute'
import type { User } from 'apps/root/types'

@Controller('v1/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@PublicRoute()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() req: Request) {
		return this.authService.login(req.user as User)
	}
}
