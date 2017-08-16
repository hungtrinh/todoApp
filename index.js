const app = require('./app')
const {server: {port}} = require('./config')
const factoryServer = (app, port) => app.listen(port)

factoryServer(app, port)
