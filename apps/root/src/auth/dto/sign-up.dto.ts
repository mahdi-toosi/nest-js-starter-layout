import { IsString, MinLength, MaxLength } from '@lib/translated-class-validator'
import { Injectable } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import type { User } from 'apps/root/types'

@Injectable()
export class SignUp implements Partial<User> {
	@ApiProperty()
	@IsString('mobile')
	@MinLength('mobile', 10)
	@MaxLength('mobile', 10)
	mobile: string

	@ApiProperty()
	@IsString('password')
	@MinLength('password', 6)
	password: string
}
