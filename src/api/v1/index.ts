import type { Router } from 'express'
import express from 'express'

import { productsRouter } from './products.js'

const router: Router = express.Router()

router.use('/products', productsRouter)

export { router as v1Router }
