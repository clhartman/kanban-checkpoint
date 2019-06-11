import express from 'express'
import cors from 'cors'
import bp from 'body-parser'

const server = express()


//Sets the port to Heroku's, and the files to the built project 
var port = process.env.PORT || 3000
server.use(express.static(__dirname + '/../client/dist'))


var whitelist = ['http://localhost:8080'];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))

//Fire up database connection
require('./db/dbconfig')


//REGISTER MIDDLEWEAR
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//REGISTER YOUR SESSION, OTHERWISE YOU WILL NEVER GET LOGGED IN
//YOUR ROUTES HERE!!!!!!
import Session from "./middlewear/session"
import AuthController from './controllers/AuthController'
import BoardController from './controllers/BoardController'
import ListController from './controllers/ListController'
import TaskController from './controllers/TaskController'

server.use(new Session().express)
server.use('/auth', new AuthController().router)
server.use('/api/boards', new BoardController().router)
server.use('/api/tasks', new TaskController().router)
server.use('/api/lists', new ListController().router)






//Default Error Handler
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } })
})

//Catch all
server.use('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


server.listen(port, () => {
  console.log('server running on port', port)
})