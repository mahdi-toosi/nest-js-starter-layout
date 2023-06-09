import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { comparePassword } from '@app/common'
import type { User } from 'apps/root/types'
import type { SignUp } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async validate(mobile: string, password: string): Promise<User | null> {
		const user = await this.usersService.findOneByMobile(mobile)
		if (!user) {
			return null
		}
		if (comparePassword(password, user.password)) return user
		else null
	}

	async login(user: User) {
		const payload = {
			id: user.id,
			last_name: user.last_name,
			first_name: user.first_name,
		}

		return {
			...payload,
			roles: user.roles,
			access_token: this.jwtService.sign(payload),
		}
	}

	async verify(token: string): Promise<User> {
		const decoded = this.jwtService.verify(token, {
			secret: this.configService.get('JWT_SECRET'),
		})
		const user = await this.usersService.findOneByMobile(decoded.mobile)

		if (user) return user
		else throw new UnauthorizedException('Unable to get the user from token')
	}

	signUp(payload: SignUp) {
		return this.usersService.create(payload as User)
	}
}
