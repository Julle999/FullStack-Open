require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI_NOTEAPP = process.env.MONGODB_URI_NOTEAPP

module.exports = { MONGODB_URI_NOTEAPP, PORT }