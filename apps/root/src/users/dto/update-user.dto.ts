import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { IsNumberString } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserParamsDto {
	@IsNumberString()
	id: number
}
