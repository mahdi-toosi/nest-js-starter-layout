import {
	IsString as _IsString,
	Matches as _Matches,
	MinLength as _MinLength,
	MaxLength as _MaxLength,
} from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export function IsString(property: string, params?: ValidationOptions) {
	const message = `${property} باید استرینگ باشد`
	return _IsString({ ...params, message })
}

export function MinLength(property: string, min: number, params?: ValidationOptions) {
	const message = `${property} باید حداقل ${min} کاراکتر داشته باشد`
	return _MinLength(min, { ...params, message })
}

export function MaxLength(property: string, min: number, params?: ValidationOptions) {
	const message = `${property} باید حداکثر ${min} کاراکتر داشته باشد`
	return _MaxLength(min, { ...params, message })
}

export function IsMobileNumber() {
	const message = 'شماره تلفن همراه معتبر نمی باشد'
	return _Matches(/^09\d{9}$/, { message })
}
