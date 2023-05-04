import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaCrudService } from 'nestjs-prisma-crud'
import { PrismaService } from '../prisma.service'
import { Role } from 'apps/root/types'
import { hashPassword } from '@app/common'
import type { User } from 'apps/root/types'

@Injectable()
export class UsersService extends PrismaCrudService {
	constructor(private readonly prisma: PrismaService) {
		super({
			model: 'users',
			allowedJoins: [],
		})
	}

	async create(user: User): Promise<User | null> {
		const userWithDefaultRole = {
			...user,
			roles: Role.USER,
			password: hashPassword(user.password),
		}

		const existedUser = await this.findOneByMobile(userWithDefaultRole.mobile)
		if (existedUser) throw new ConflictException('شماره همراه قبلا به ثبت رسیده است.')

		const userDB = await this.prisma.users.create({ data: userWithDefaultRole })

		if (userDB) {
			delete userDB.mobile
			delete userDB.password
		}
		return userDB
	}

	findOneByMobile(mobile: string): Promise<User | null> {
		return this.prisma.users.findFirst({ where: { mobile } })
	}

	findById(id: number) {
		return this.prisma.users.findFirst({ where: { id } })
	}
}
