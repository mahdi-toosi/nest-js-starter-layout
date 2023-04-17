/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/rootClient'
import type { PrismaClientModels } from 'types/prisma'
import type { PrismaInstanceType } from 'apps/root/src/prisma.service'

import generateUsers from './users'

interface Services {
	name: PrismaClientModels<PrismaInstanceType>
	count: number
	generateFunc: (count: number) => any
}

// initialize Prisma Client
const prisma = new PrismaClient()

const services = [{ name: 'users', count: 50, generateFunc: generateUsers }] as Services[]

async function main() {
	await cleanDb()
	for (const key in services) {
		const service = services[key]

		console.log(`${service.name} | generating Data ==========`)
		const data = await service.generateFunc(service.count)
		console.log(`${service.name} | generated`)

		for (let index = 0; index < data.length; index++) {
			const createMany = () => prisma[service.name].createMany({ data: data[index] })

			await createMany()
		}

		console.log(`${service.name} | seeds done`)
	}
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect()
	})

async function cleanDb() {
	// clean db
	await prisma.$transaction(
		services.map(s => s.name).map(serviceName => prisma[serviceName].deleteMany())
	)
}
