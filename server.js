const express = require('express')
const path = require('path')
const cors = require('cors');
const history = require('connect-history-api-fallback')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')
//const sslRedirect = require('heroku-ssl-redirect')

const app = express()
//app.use(cors())
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
    const server = app.listen(process.env.PORT || 3000, function() {
        console.log('Web app now running at ' + server.address().address + ':' + server.address().port)
    })
    const io = socketIO(server, { cors: true });
    io.on('connection', (socket) => {
        console.log('new connection')

        socket.on('disconnect', () => {
            console.log('disconnected')
        })

        socket.on('message', (data) => {
            io.emit('test', data)
        })
    })
}

const API_BASE_PATH = '/api'
const whitelist = ['doyouknowthis', 'localhost']
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true)
            return
        }

        if (whitelist.some((allowedPath) => origin.includes(allowedPath))) callback(null, true)
        else {
            console.error('origin', origin)
            callback('Not allowed')
        }
    }
}
const { addQuizz } = require('./api/quizz.js')
const setupApi = () => {
    const router = express.Router()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.text())
    app.use(bodyParser.json())

    router.get(`${API_BASE_PATH}/quizz/`, cors(corsOptions), async (request, response) => {
        const resp = await addQuizz(request.query)
        if (resp) response.send(resp)
        else response.send(null)
    })
    app.use('/', router)
}

const start = () => {
  //setupSSLRedirect()
    if(process.env.PORT) serveFrontend()
    startServer()
    setupApi()
}

start()
