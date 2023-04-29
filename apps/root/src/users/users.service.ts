import { Injectable } from '@nestjs/common'
import { PrismaCrudService } from 'nestjs-prisma-crud'
import { PrismaService } from '../prisma.service'
import type { User } from 'apps/root/types'

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

	findById(id: number) {
		return this.prisma.users.findFirst({ where: { id } })
	}
}
