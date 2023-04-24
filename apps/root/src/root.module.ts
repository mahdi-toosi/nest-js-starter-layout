import * as Joi from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaCrudModule } from 'nestjs-prisma-crud'
import { UsersModule } from './users/users.module'
import { PrismaService as prismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				ROOT_PORT: Joi.string().required(),

				DATABASE_URL: Joi.string().required(),
				POSTGRESQL_PORT: Joi.string().required(),
				POSTGRESQL_DOMAIN: Joi.string().required(),
				POSTGRESQL_DATABASE: Joi.string().required(),
				POSTGRESQL_USERNAME: Joi.string().required(),
				POSTGRESQL_PASSWORD: Joi.string().required(),

				JWT_SECRET: Joi.string().required(),
				JWT_EXPIRATION: Joi.string().required(),
			}),
			envFilePath: `${process.cwd()}/apps/root/prisma/.env`,
		}),
		UsersModule,
		PrismaCrudModule.register({ prismaService }),
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class RootModule {}
