import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaCrudModule } from 'nestjs-prisma-crud'
import { UsersModule } from './users/users.module'
import { PrismaService as prismaService } from './prisma.service'
import * as z from 'zod'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: {
				validate: () =>
					z.object({
						ROOT_PORT: z.string(),

						ROOT_DATABASE_URL: z.string(),
						ROOT_POSTGRESQL_PORT: z.string(),
						ROOT_POSTGRESQL_DOMAIN: z.string(),
						ROOT_POSTGRESQL_DATABASE: z.string(),
						ROOT_POSTGRESQL_USERNAME: z.string(),
						ROOT_POSTGRESQL_PASSWORD: z.string(),

						JWT_SECRET: z.string(),
						JWT_EXPIRATION: z.string(),
					}),
			},
			envFilePath: 'apps/root/.env',
		}),
		UsersModule,
		PrismaCrudModule.register({ prismaService }),
	],
	controllers: [],
	providers: [],
})
export class RootModule {}
