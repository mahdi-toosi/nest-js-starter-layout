import { Injectable } from '@nestjs/common'
import { PrismaCrudService } from 'nestjs-prisma-crud'

@Injectable()
export class UsersService extends PrismaCrudService {
	constructor() {
		super({
			model: 'users',
			allowedJoins: [],
		})
	}
}
