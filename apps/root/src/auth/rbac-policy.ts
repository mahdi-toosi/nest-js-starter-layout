import { RolesBuilder } from 'nest-access-control'
import { Role } from 'apps/root/types'

const RBAC_POLICY: RolesBuilder = new RolesBuilder()

enum Resource {
	users = 'users',
}

// prettier-ignore
RBAC_POLICY
	.grant(Role.USER)
		.read('user')
		.update(Resource.users)
	.grant(Role.ADMIN)
		.extend(Role.USER)
		.update('change-user-role')
		.create([Resource.users])
		.read([Resource.users])
		.delete([Resource.users])

export { RBAC_POLICY }
