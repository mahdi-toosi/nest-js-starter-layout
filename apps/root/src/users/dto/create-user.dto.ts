import { IsString, MinLength } from '@lib/translated-class-validator'
import type { Users as User } from '@prisma/rootClient'

export class CreateUserDto implements Partial<User> {
	@IsString('first_name')
	@MinLength('first_name', 2)
	first_name: string

	@IsString('last_name')
	@MinLength('last_name', 2)
	last_name: string

	@IsString('mobile')
	@MinLength('mobile', 10)
	mobile: string
}
