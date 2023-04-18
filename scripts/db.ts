import { existsSync } from 'fs'
import { spawn } from 'child_process'

const thirdArg = process.argv[4]
const command = process.argv[3]
const moduleName = process.argv[2]

const moduleNames = ['root']

const envPath = `apps/${moduleName}/prisma/.env`
const schemaPath = `apps/${moduleName}/prisma/schema.prisma`
const seederPath = `apps/${moduleName}/prisma/seeds`

const commands = {
	seed: `npx ts-node ${seederPath}`,
	pull: `npx dotenv -e ${envPath} -- prisma db pull --schema ${schemaPath}`,
	studio: `npx dotenv -e ${envPath} -- prisma studio --schema ${schemaPath}`,
	push: `npx dotenv -e ${envPath} -- prisma db push --schema ${schemaPath}`,
	generate: `npx dotenv -e ${envPath} -- prisma generate --schema ${schemaPath}`,
	reset: `npx dotenv -e ${envPath} -- prisma migrate reset --schema ${schemaPath}`,
	deploy: `npx dotenv -e ${envPath} -- prisma migrate deploy --schema ${schemaPath}`,
	migrate: `npx dotenv -e ${envPath} -- prisma migrate dev --schema ${schemaPath} --name ${thirdArg}`,
	rollback: `npx dotenv -e ${envPath} -- prisma migrate resolve --rolled-back ${thirdArg} --schema ${schemaPath}`,
}

try {
	if (!moduleNames.includes(moduleName)) throw new Error('module name is not valid')

	if (!Object.keys(commands).includes(command)) throw new Error('command is not valid')

	if (!existsSync(envPath)) throw new Error(`env does not exists in ${envPath}`)

	if (!existsSync(schemaPath)) throw new Error(`schema does not exists in ${schemaPath}`)

	if (command === 'migrate' && !thirdArg)
		throw new Error(`as third arg you did not set migrate message`)

	if (command === 'rollback' && !thirdArg)
		throw new Error(`as third arg you did not set migrate message that want to rollback`)

	console.log(`\x1b[33m 👇🏻 here is your command 🎉 \n\n \x1b[0m`)
	console.log(`\x1b[33m ${commands[command]} \n\n \x1b[0m`)
	console.log(`\x1b[33m 👍🏻 its copied to your clipboard \n\n \x1b[0m`)

	const proc = spawn('pbcopy')
	proc.stdin.write(commands[command])
	proc.stdin.end()
} catch (error) {
	console.log(`\x1b[31m ERROR => ${error.message} \x1b[0m`)
	process.exit(1)
}
