import type { Response, NextFunction, Router } from 'express'
import express from 'express'

import { v1Router } from './v1/index.js'

const router: Router = express.Router()

router.use((_, response: Response, next: NextFunction) => {
	response.removeHeader('X-Powered-By')
	next()
})

router.use('/v1', v1Router)

export { router as apiRouter }
