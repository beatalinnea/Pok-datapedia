/**
 * The starting point of the server.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'
import { loadDataToMongo } from './services/csv-to-mongo.js'

try {
  // Connect to MongoDB.
  await connectDB()

  // Load data to MongoDB.
  await loadDataToMongo('./src/data/pokemon.csv')

  // Creates an Express application.
  const app = express()

  // Use helmet, send policy to the browser.
  app.use(helmet())

  // Edit response headers (https://expressjs.com/en/api.html#res.set)
  // to allow cross-origin requests from my frontend
  app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': `${process.env.DEV_FRONTEND_URL}`,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, cookie, Set-Cookie, Cookie',
      'Access-Control-Allow-Credentials': 'true'
    })
    next()
  })

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Parse requests of the content type application/json.
  app.use(express.json({ limit: '500kb' }))

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }

    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        cause: err.cause
          ? {
              status: err.cause.status,
              message: err.cause.message,
              stack: err.cause.stack
            }
          : null,
        stack: err.stack
      })
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
