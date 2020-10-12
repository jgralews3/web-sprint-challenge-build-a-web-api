const express = require('express');

const server = express();

function logger(req, res, next) {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}, Time: ${new Date().toISOString()}`);
  next();
}
server.use(logger);

const projectRouter = require('./projects/projectRouter')
const actionRouter = require('./actions/actionRouter')

server.use(express.json())
server.use(projectRouter);
server.use(actionRouter);


server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong, please try again later"
    })
})

module.exports = server;