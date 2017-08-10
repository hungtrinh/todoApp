const app = require('./app')
const port = process.env.PORT || 3000
const factoryServer = (app, port) => app.listen(port)

factoryServer(app, port)
