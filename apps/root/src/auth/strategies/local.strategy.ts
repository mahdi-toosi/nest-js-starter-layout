import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import type { Users as User } from '@prisma/rootClient'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'mobile' })
	}

	async validate(mobile: string, password: string): Promise<User> {
		const user = await this.authService.validate(mobile, password)
		if (user) return user
		else throw new UnauthorizedException()
	}
}
