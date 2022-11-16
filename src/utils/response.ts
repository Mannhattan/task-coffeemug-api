import type { FormattedResponse, ResponseProductsData } from './types.js'

export const RESPONSE_CODES = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	SERVER_ERROR: 500,
}

export const RESPONSE_ERROR_MESSAGES = {
	INTERNAL_SERVER_ERROR: 'Internal error',
}

export const formattedResponse = (data: ResponseProductsData, errors: string[], code: number): FormattedResponse => ({
	code,
	data: {
		data,
		errors,
		meta: {
			time: new Date().toISOString(),
		},
	},
})
