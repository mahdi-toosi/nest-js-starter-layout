import * as Joi from 'joi'

export function validateEnvParams(params: string[]) {
	if (!params) throw new Error("you don't specify params for validateEnvParams function")

	const obj = {} as Record<string, Joi.SchemaLike>

	params.forEach(param => {
		obj[param] = Joi.string().required()
	})

	return Joi.object(obj)
}
