import { faker } from '@faker-js/faker'
import type { Users as User } from '@prisma/rootClient'

export default async function (count: number) {
	const data = []

	for (let index = 0; index < count; index++) {
		const obj = {
			first_name: faker.name.jobTitle(),
			last_name: faker.name.jobTitle(),
			mobile: getFakeMobile(index),
		} as User

		data.push(obj)
	}

	return data
}

function getFakeMobile(index: number) {
	return String(Number(String(faker.datatype.number({ min: 93800000, max: 93900000 })) + index))
}
