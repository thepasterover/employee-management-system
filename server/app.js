const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const adminRoutes = require('./routes/admin')

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
	bodyParser.urlencoded({
		limit: '100mb',
		extended: true,
		parameterLimit: 50000,
	})
)

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-shard-00-00.m6ew8.mongodb.net:27017,cluster0-shard-00-01.m6ew8.mongodb.net:27017,cluster0-shard-00-02.m6ew8.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=atlas-i8464a-shard-0&authSource=admin&retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})
mongoose.set('useCreateIndex', true)

app.use('/admin', adminRoutes)

app.listen(5000)