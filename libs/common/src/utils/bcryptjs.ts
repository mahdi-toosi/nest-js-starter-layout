import { hashSync, genSaltSync, compareSync } from 'bcryptjs'

export function hashPassword(password: string) {
	return hashSync(password, genSaltSync(10))
}

export function comparePassword(password: string, hash: string) {
	return compareSync(password, hash)
}
