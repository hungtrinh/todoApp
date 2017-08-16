const app = require('./app')
const appConfig = require('./config')
const {port} = appConfig.server
const factoryServer = (app, port) => app.listen(port)

factoryServer(app, port)
