import { Controller, Get, Param } from '@nestjs/common'
import { AnotherModuleService } from './another-module.service'

@Controller('another-module')
export class AnotherModuleController {
	constructor(private readonly anotherModuleService: AnotherModuleService) {}

	@Get('/get-user/:id')
	create(@Param('id') id: number) {
		console.log(id)
		return true
	}
}
