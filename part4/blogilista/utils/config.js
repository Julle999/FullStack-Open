require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI_BLOGLIST = process.env.MONGODB_URI_BLOGLIST

module.exports = { MONGODB_URI_BLOGLIST, PORT }