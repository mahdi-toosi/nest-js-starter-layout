import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaCrudModule } from 'nestjs-prisma-crud'
import { UsersModule } from './users/users.module'
import { PrismaService as prismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module'
import { ACGuard, AccessControlModule } from 'nest-access-control'
import { RBAC_POLICY } from './auth/rbac-policy'
import { APP_GUARD } from '@nestjs/core'
import JwtAuthGuard from './auth/guards/jwt-auth.guard'
import { RmqModule, validateEnvParams } from '@app/common'

const envParams = [
	'ROOT_PORT',

	'JWT_SECRET',
	'JWT_EXPIRATION',

	'DATABASE_URL',
	'POSTGRESQL_PORT',
	'POSTGRESQL_DOMAIN',
	'POSTGRESQL_DATABASE',
	'POSTGRESQL_USERNAME',
	'POSTGRESQL_PASSWORD',

	'RABBIT_MQ_URI',
	'RABBIT_MQ_ROOT_QUEUE',
	'RABBIT_MQ_ANOTHER_SERVICE_QUEUE',
]

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: validateEnvParams(envParams),
			envFilePath: `${process.cwd()}/apps/root/prisma/.env`,
		}),
		RmqModule,
		UsersModule,
		PrismaCrudModule.register({ prismaService }),
		AccessControlModule.forRoles(RBAC_POLICY),
		AuthModule,
	],
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: ACGuard },
	],
})
export class RootModule {}
