const express = require('express');

const ResourcesRouter = require('./routers/resources-router.js');
const ProjectssRouter = require('./routers/projects-router.js');
const TasksRouter = require('./routers/tasks-router.js');

const server = express();

server.use(express.json());

server.use('/api/resources', ResourcesRouter);
server.use('/api/projects', ProjectssRouter);
server.use('/api/tasks', TasksRouter);

module.exports = server;