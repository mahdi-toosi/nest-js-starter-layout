import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ConfigService } from '@nestjs/config'

@Controller('v1/users')
export class UsersController {
	constructor(private readonly usersService: UsersService, private readonly env: ConfigService) {}

	@Get()
	async findMany(@Query('crudQuery') crudQuery: string) {
		console.log(this.env.get('ROOT_PORT'))

		const result = await this.usersService.findMany({ crudQuery })
		return result
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
		const result = await this.usersService.findOne(id, { crudQuery })
		return result
	}

	@Post()
	async create(@Body() createUserDto: CreateUserDto, @Query('crudQuery') crudQuery: string) {
		const result = await this.usersService.create(createUserDto, { crudQuery })
		return result
	}

	@Patch(':id')
	async update(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto,
		@Query('crudQuery') crudQuery: string
	) {
		const result = await this.usersService.update(id, updateUserDto, {
			crudQuery,
		})
		return result
	}

	@Delete(':id')
	async remove(@Param('id') id: number, @Query('crudQuery') crudQuery: string) {
		return this.usersService.remove(id, { crudQuery })
	}
}
