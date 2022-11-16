/* eslint-disable n/prefer-global/process */
import * as dotenv from 'dotenv'

import type { Application } from 'express'
import express from 'express'

import bodyParser from 'body-parser'
import type { Connection } from 'mongoose'
import mongoose from 'mongoose'
import cors from 'cors'

import { apiRouter } from './api/index.js'

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', apiRouter)

mongoose.connect(`mongodb://${process.env.DB_USERNAME ?? ''}:${process.env.DB_PASSWORD ?? ''}@${process.env.DB_HOST ?? ''}:27017/${process.env.DB_INITIALDB ?? ''}?authSource=admin`, {}, () => {
	console.log('Mongoose - connected to db')
})

const db: Connection = mongoose.connection

db.once('open', () => {
	app.listen(process.env.PORT, () => {
		console.log(`Backend running on port ${process.env.PORT ?? ''}`)
	})
})

db.on('error', error => {
	console.error(error)
})

process.on('SIGINT', () => {
	db.close(() => {
		console.log('Mongoose - disconnected from db on app termination')
		process.exit(0)
	})
})
