import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UseRoles } from 'nest-access-control'
import { PublicRoute } from '../auth/decorators/PublicRoute'
import { ApiTags } from '@nestjs/swagger'
import { User, Role } from 'apps/root/types'
import { CurrentUser } from '@app/common'
import { ChangeRolDto } from './dto/change-role.dto'
import { Get, Post, Body, Patch, Param, Delete, Query, Controller } from '@nestjs/common'
import { ConflictException, ForbiddenException } from '@nestjs/common'

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseRoles({ resource: 'users', action: 'read' })
	@Get()
	async findMany(@Query('crudQuery') crudQuery: string) {
		const result = await this.usersService.findMany({ crudQuery })
		return result
	}

	@UseRoles({ resource: 'user', action: 'read' })
	@Get(':id')
	async findOne(@Param('id') id: number, @CurrentUser() user: User) {
		if (!user.roles.includes(Role.ADMIN) && user.id !== id) throw new ForbiddenException()

		const result = await this.usersService.findOne(id, { crudQuery: undefined })
		return result
	}

	@UseRoles({ resource: 'users', action: 'create' })
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto as User)
	}

	@UseRoles({ resource: 'users', action: 'update' })
	@Patch(':id')
	async update(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto,
		@CurrentUser() user: User
	) {
		if (!user.roles.includes(Role.ADMIN) && user.id !== id) throw new ForbiddenException()

		const result = await this.usersService.update(id, updateUserDto, { crudQuery: undefined })
		return result
	}

	@UseRoles({ resource: 'users', action: 'delete' })
	@Delete(':id')
	async remove(@Param('id') id: number) {
		return this.usersService.remove(id, { crudQuery: undefined })
	}

	@UseRoles({ resource: 'change-user-role', action: 'update' })
	@Patch(':id/change-role')
	async changeRole(@Param('id') id: number, @Body() changeRolDto: ChangeRolDto) {
		const result = await this.usersService.update(id, changeRolDto, { crudQuery: undefined })
		return result
	}
}
