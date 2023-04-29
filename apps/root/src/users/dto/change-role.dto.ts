import { IsIn } from 'class-validator'
import type { User } from 'apps/root/types'
import { Role } from 'apps/root/types'

export class ChangeRolDto implements Partial<User> {
	@IsIn(Object.keys(Role))
	roles: Role[]
}
