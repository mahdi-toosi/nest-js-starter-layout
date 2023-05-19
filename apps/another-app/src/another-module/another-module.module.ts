import { Module } from '@nestjs/common'
import { AnotherModuleService } from './another-module.service'
import { AnotherModuleController } from './another-module.controller'

@Module({
	controllers: [AnotherModuleController],
	providers: [AnotherModuleService],
})
export class AnotherModuleModule {}
