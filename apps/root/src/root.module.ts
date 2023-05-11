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
import { validateEnvParams } from '@app/common'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: validateEnvParams([
				'ROOT_PORT',
				'JWT_SECRET',
				'DATABASE_URL',
				'JWT_EXPIRATION',
				'POSTGRESQL_PORT',
				'POSTGRESQL_DOMAIN',
				'POSTGRESQL_DATABASE',
				'POSTGRESQL_USERNAME',
				'POSTGRESQL_PASSWORD',
			]),
			envFilePath: `${process.cwd()}/apps/root/prisma/.env`,
		}),
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
