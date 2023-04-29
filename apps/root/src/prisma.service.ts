import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/rootClient'
// ? types
import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common'

export type PrismaInstanceType = InstanceType<typeof PrismaClient>

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
