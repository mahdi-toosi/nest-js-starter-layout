import { createParamDecorator } from '@nestjs/common'
import type { ExecutionContext } from '@nestjs/common'

type User = {
	id: number
	first_name: string | null
	last_name: string | null
	mobile: string
	password: string
	roles: string[]
	createdAt: Date
	updatedAt: Date
}

export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext): User => {
		if (context.getType() === 'http') {
			return context.switchToHttp().getRequest().user
		}
		if (context.getType() === 'rpc') {
			return context.switchToRpc().getData().user
		}
	}
)
