import { IsString as _IsString, MinLength as _MinLength } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export function IsString(property: string, params?: ValidationOptions) {
	const message = `${property} باید استرینگ باشد`
	return _IsString({ ...params, message })
}

export function MinLength(property: string, min: number, params?: ValidationOptions) {
	const message = `${property} باید حداقل ${min} کاراکتر داشته باشد`
	return _MinLength(min, { ...params, message })
}
