/*
 * @Author: 杨宏旋
 * @Date: 2021-03-24 15:15:04
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-24 15:30:07
 * @Description:
 */
const debug = require('debug')('demo:server')
const http = require('http')
const app = require('../app')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '7666')
// app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app.callback())

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const portNum = parseInt(val, 10)

  if (isNaN(portNum)) {
    // named pipe
    return val
  }

  if (portNum >= 0) {
    // port number
    return portNum
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}
