import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	ConflictException,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto, UpdateUserParamsDto } from './dto/update-user.dto'
import { ConfigService } from '@nestjs/config'
import { UseRoles } from 'nest-access-control'
import { PublicRoute } from '../auth/decorators/PublicRoute'
import type { Users as User } from '@prisma/rootClient'
import { Role } from '../auth/rbac-policy'

@Controller('v1/users')
export class UsersController {
	constructor(private readonly usersService: UsersService, private readonly env: ConfigService) {}

	@UseRoles({
		resource: 'users',
		action: 'read',
		possession: 'any',
	})
	@Get()
	async findMany(@Query('crudQuery') crudQuery: string) {
		const result = await this.usersService.findMany({ crudQuery })
		return result
	}

	@UseRoles({
		resource: 'users',
		action: 'read',
		possession: 'any',
	})
	@Get(':id')
	async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
		const result = await this.usersService.findOne(id, { crudQuery })
		return result
	}

	@PublicRoute()
	@Post()
	async create(@Body() createUserDto: CreateUserDto, @Query('crudQuery') crudQuery: string) {
		const userWithDefaultRole = { ...createUserDto, role: Role.USER }

		const existedUser = await this.usersService.findOneByMobile(userWithDefaultRole.mobile)
		if (existedUser) throw new ConflictException('شماره همراه قبلا به ثبت رسیده است.')

		const user = (await this.usersService.create(userWithDefaultRole, { crudQuery })) as User

		if (user) {
			delete user.mobile
			delete user.password
		}
		return user
	}

	// @UseRoles({
	// 	resource: 'users',
	// 	action: 'update',
	// 	possession: 'any',
	// })
	@Patch(':id')
	async update(
		@Param() params: UpdateUserParamsDto,
		@Body() updateUserDto: UpdateUserDto,
		@Query('crudQuery') crudQuery: string
	) {
		const result = await this.usersService.update(params.id, updateUserDto, {
			crudQuery,
		})
		return result
	}

	@UseRoles({
		resource: 'users',
		action: 'delete',
		possession: 'any',
	})
	@Delete(':id')
	async remove(@Param() params: UpdateUserParamsDto, @Query('crudQuery') crudQuery: string) {
		return this.usersService.remove(params.id, { crudQuery })
	}
}
