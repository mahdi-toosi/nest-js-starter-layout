import { Body, ConflictException, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request } from 'express'
import { PublicRoute } from './decorators/PublicRoute'
import { SignUp } from './dto/sign-up.dto'
import { UsersService } from '../users/users.service'
import type { User } from 'apps/root/types'

@Controller('v1/auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@PublicRoute()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() req: Request) {
		return this.authService.login(req.user as User)
	}

	@PublicRoute()
	@Post('sign-up')
	async signUp(@Body() form: SignUp) {
		const existedUser = await this.usersService.findOneByMobile(form.mobile)
		if (existedUser) throw new ConflictException('شماره همراه قبلا به ثبت رسیده است.')

		return this.authService.signUp(form)
	}
}
