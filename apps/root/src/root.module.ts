import { Module } from '@nestjs/common'
import { RootController } from './root.controller'
import { RootService } from './root.service'
import { PrismaCrudModule } from 'nestjs-prisma-crud'
import { UsersModule } from './users/users.module'
import { PrismaService as prismaService } from '@app/common'

@Module({
	imports: [UsersModule, PrismaCrudModule.register({ prismaService })],
	controllers: [RootController],
	providers: [RootService],
})
export class RootModule {}
