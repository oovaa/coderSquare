import express, { type ErrorRequestHandler, type RequestHandler } from 'express'
import { createPostHAndler, listPostsHandler } from './handlers/postHandlers'
import { createUserHandler, GetUserByEmailHandler, GetUserByUserNameHandler } from './handlers/UserHandles'
const app = express()
app.use(express.json())

const requestLoggerMilddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, '- body', req.body);
  next()
}

app.use(requestLoggerMilddleware)

//posts
app.get('/posts', listPostsHandler)
app.post('/posts', createPostHAndler)

//user
app.get('/user/', GetUserByUserNameHandler)
// app.get('/user/', GetUserByEmailHandler)
app.post('/user', createUserHandler)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('uncoaught error', err);
  res.status(500)
  return res.status(500).send('Oops we have a problem in our servers')
}

app.use(errorHandler)

app.listen(4000, () => {
  console.log(`hi there app is on http://localhost:4000`);
})