import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@Query('crudQuery') crudQuery: string,
	) {
		const created = await this.usersService.create(createUserDto, { crudQuery })
		return created
	}

	@Get()
	async findMany(@Query('crudQuery') crudQuery: string) {
		const matches = await this.usersService.findMany({ crudQuery })
		return matches
	}

	@Get(':id')
	async findOne(
		@Param('id') id: string,
		@Query('crudQuery') crudQuery: string,
	) {
		const match = await this.usersService.findOne(id, { crudQuery })
		return match
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
		@Query('crudQuery') crudQuery: string,
	) {
		const updated = await this.usersService.update(id, updateUserDto, {
			crudQuery,
		})
		return updated
	}

	@Delete(':id')
	async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
		return this.usersService.remove(id, { crudQuery })
	}
}
