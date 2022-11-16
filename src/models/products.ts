import mongoose from 'mongoose'
import type { IProduct } from '../utils/types.js'

const productsSchema = new mongoose.Schema<IProduct>({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	updateDate: {
		type: Date,
		required: false,
		default: new Date().toISOString(),
	},
})

const PRODUCTS_MODEL = mongoose.model<IProduct>('products', productsSchema)

export default PRODUCTS_MODEL
