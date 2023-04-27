import { RolesBuilder } from 'nest-access-control'
export enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
}

const RBAC_POLICY: RolesBuilder = new RolesBuilder()

// prettier-ignore
RBAC_POLICY
	.grant(Role.USER)
		.readOwn('users')
		.updateOwn('users')
	.grant(Role.ADMIN)
		.extend(Role.USER)
		.resource('users')
	.deny(Role.ADMIN)
		.read('managedEmployeeData')

export { RBAC_POLICY }
