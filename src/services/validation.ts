import type { ProductObject } from '../utils/types.js'

const PRODUCT_VALIDATORS = {
	ID: {
		regex: /^[\da-fA-F]{8}(?:-[\da-fA-F]{4}){3}-[\da-fA-F]{12}$/,
		errorMessage: 'Invalid ID format',
	},
	NAME: {
		regex: /^[A-Za-z \d]{1,100}$/,
		errorMessage: 'Invalid Name format',
	},
	PRICE: {
		regex: /^\d{1,10}\.\d{0,2}$/,
		errorMessage: 'Invalid Price format',
	},
}

export const validateProductObject = (productObject: ProductObject): string[] => {
	const errors = [
		...((typeof productObject.name === 'string' && PRODUCT_VALIDATORS.NAME.regex.test(productObject.name)) ? [] : [PRODUCT_VALIDATORS.NAME.errorMessage]),
		...((typeof productObject.price === 'number' && PRODUCT_VALIDATORS.PRICE.regex.test(String(productObject.price))) ? [] : [PRODUCT_VALIDATORS.PRICE.errorMessage]),
	]

	return errors
}

export const validateProductId = (productId: string): string[] => [
	...((typeof productId === 'string' && PRODUCT_VALIDATORS.ID.regex.test(productId)) ? [] : [PRODUCT_VALIDATORS.ID.errorMessage]),
]
