const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')
//const sslRedirect = require('heroku-ssl-redirect')

const app = express()
app.disable('x-powered-by')

// const setupSSLRedirect = () => {
//   // enable ssl redirect: for staging/production environments, when accessing the http url, a redirect to https will be done (http error code 301)
//   app.use(sslRedirect(['staging', 'production'], 301))
// }

const serveFrontend = () => {
  const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))
  app.use(staticFileMiddleware)
  app.use(history({ disableDotRule: true }))
  app.use(staticFileMiddleware)
}

const startServer = () => {
  const server = app.listen(process.env.PORT || 8080, function() {
    console.log('Web app now running at ' + server.address().address + ':' + server.address().port)
  })
}

const start = () => {
  //setupSSLRedirect()
  serveFrontend()
  startServer()
}

start()
