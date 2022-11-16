import type { Request, Response, Router } from 'express'
import express from 'express'

import { createOrUpdateProduct, deleteProduct, getAllProducts, getProduct } from '../../controllers/products.js'
import type { FormattedResponse } from '../../utils/types.js'

const router: Router = express.Router()

router.get('/', async (_, response: Response) => {
	const { code, data }: FormattedResponse = await getAllProducts()
	response.status(code).json(data)
})

router.get('/:productId', async (request: Request, response: Response) => {
	const { code, data }: FormattedResponse = await getProduct(request.params.productId)
	response.status(code).json(data)
})

router.post('/', async (request: Request, response: Response) => {
	const { code, data }: FormattedResponse = await createOrUpdateProduct(request.body)
	response.status(code).json(data)
})

router.put('/:productId', async (request: Request, response: Response) => {
	const { code, data }: FormattedResponse = await createOrUpdateProduct(request.body, request.params.productId)
	response.status(code).json(data)
})

router.delete('/:productId', async (request: Request, response: Response) => {
	const { code, data }: FormattedResponse = await deleteProduct(request.params.productId)
	response.status(code).json(data)
})

export { router as productsRouter }
