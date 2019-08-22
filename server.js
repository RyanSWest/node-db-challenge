const express = require('express');

const ProjectRouter = require('./data/projects/projectRouter')
const TaskRouter = require('./data/projects/tasksRouter')
const ResourceRouter = require ('./data/projects/resourcesRouter')
const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/tasks', TaskRouter);
server.use('/api/resources', ResourceRouter)

module.exports = server;