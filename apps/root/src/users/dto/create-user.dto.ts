import { IsMobileNumber, IsString, MinLength } from '@lib/translated-class-validator'
import { Injectable } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import type { User } from 'apps/root/types'

@Injectable()
export class CreateUserDto implements Partial<User> {
	@ApiProperty()
	@IsString('first_name')
	@MinLength('first_name', 2)
	first_name: string

	@ApiProperty()
	@IsString('last_name')
	@MinLength('last_name', 2)
	last_name: string

	@ApiProperty()
	@IsMobileNumber()
	mobile: string

	@ApiProperty()
	@IsString('password')
	@MinLength('password', 6)
	password: string
}
