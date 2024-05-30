import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import events from './routes.js'
import { db } from './db.js'

const app = express()

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
)

const port = process.env.PORT

app.use(express.json())

app.use('/api', events)

app.get('/', (req, res) => {
	res.json('It works! yehet')
})

app.listen(port, () => {
	console.log(`Connected, running on port ${port}`)
})

db()
