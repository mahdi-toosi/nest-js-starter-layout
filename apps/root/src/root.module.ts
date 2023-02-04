import { Module } from '@nestjs/common'
import { RootController } from './root.controller'
import { RootService } from './root.service'
import { UsersModule } from './users/users.module'

@Module({
	imports: [UsersModule],
	controllers: [RootController],
	providers: [RootService],
})
export class RootModule {}
