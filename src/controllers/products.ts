import { randomUUID } from 'node:crypto'

import PRODUCTS_MODEL from '../models/products.js'

import { formattedResponse, RESPONSE_CODES, RESPONSE_ERROR_MESSAGES } from '../utils/response.js'
import type { FormattedResponse, ProductObject } from '../utils/types.js'

import { validateProductObject, validateProductId } from '../services/validation.js'

const PROJECTION_EXCLUDE_FIELDS = { _id: 0, __v: 0 }

export const getAllProducts = async (): Promise<FormattedResponse> => {
	const errors = []
	let products
	let code: number = RESPONSE_CODES.SERVER_ERROR // Default response code

	try {
		products = await PRODUCTS_MODEL.find({}, PROJECTION_EXCLUDE_FIELDS)
		code = RESPONSE_CODES.OK
	} catch {
		errors.push(RESPONSE_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
	}

	return formattedResponse(products, errors, code)
}

export const getProduct = async (productId: string): Promise<FormattedResponse> => {
	const errors = validateProductId(productId)
	let product
	let code: number = RESPONSE_CODES.BAD_REQUEST

	if (errors.length === 0) {
		try {
			product = await PRODUCTS_MODEL.findOne({ id: productId }, PROJECTION_EXCLUDE_FIELDS)
			code = RESPONSE_CODES.OK
		} catch {
			code = RESPONSE_CODES.SERVER_ERROR
			errors.push(RESPONSE_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		}
	}

	return formattedResponse(product, errors, code)
}

export const createOrUpdateProduct = async (productObject: ProductObject, productId: string | undefined = undefined): Promise<FormattedResponse> => {
	const errors = validateProductObject(productObject)
	let product
	let code: number = RESPONSE_CODES.BAD_REQUEST

	if (errors.length === 0) {
		try {
			const update = {
				...(productId ? {} : { id: randomUUID() }),
				name: productObject.name,
				price: productObject.price,
				updateDate: new Date().toISOString(),
			}
			const options = { upsert: true, new: true, projection: PROJECTION_EXCLUDE_FIELDS, setDefaultsOnInsert: true }

			product = await PRODUCTS_MODEL.findOneAndUpdate({ id: productId }, update, options)

			code = RESPONSE_CODES.CREATED
		} catch {
			code = RESPONSE_CODES.SERVER_ERROR
			errors.push(RESPONSE_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		}
	}

	return formattedResponse(product, errors, code)
}

export const deleteProduct = async (productId: string): Promise<FormattedResponse> => {
	const errors = []
	let code: number = RESPONSE_CODES.SERVER_ERROR

	try {
		await PRODUCTS_MODEL.deleteOne({ id: productId })
		code = RESPONSE_CODES.OK
	} catch {
		errors.push(RESPONSE_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
	}

	return formattedResponse(undefined, errors, code)
}
