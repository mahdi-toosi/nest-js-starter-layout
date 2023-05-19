import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaCrudModule } from 'nestjs-prisma-crud'
import { PrismaService as prismaService } from './prisma.service'
// import { ACGuard } from 'nest-access-control'
// import { APP_GUARD } from '@nestjs/core'
import { RmqModule, validateEnvParams } from '@app/common'
import { AnotherModuleModule } from './another-module/another-module.module'

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
			envFilePath: `${process.cwd()}/apps/another-app/prisma/.env`,
		}),
		RmqModule,
		PrismaCrudModule.register({ prismaService }),
		AnotherModuleModule,
	],
	controllers: [],
	providers: [
		// { provide: APP_GUARD, useClass: ACGuard }
	],
})
export class AnotherAppModule {}
