import { Injectable } from '@nestjs/common'
import { PrismaCrudService } from 'nestjs-prisma-crud'
import { PrismaService } from '../prisma.service'
import type { Users as User } from '@prisma/rootClient'

@Injectable()
export class UsersService extends PrismaCrudService {
	constructor(private readonly prisma: PrismaService) {
		super({
			model: 'users',
			allowedJoins: [],
		})
	}

	findOneByMobile(mobile: string): Promise<User | null> {
		return this.prisma.users.findFirst({ where: { mobile } })
	}
}
