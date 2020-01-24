const express = require('express');

const Tasks = require('../data/models/tasksModel');

const Projects = require('../data/models/projectsModel');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.find()
        .then(data => {
            const map = data.map(x =>
                Object.assign(Object.assign({}, x),
                    { completed: x.completed === 0 ? false : true }));
            res.json(map);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get Tasks' });
        });
});

router.post('/', validateTasks, validateProjectId, (req, res) => {
    const change = req.body;
    if (!change.completed || change.completed === false) {
        change.completed = 0;
    } else if (change.completed === true) {
        change.completed = 1;
    }  
    Tasks.add(change)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new Task' });
        });
});

function validateTasks(req, res, next) {
    const changes = req.body;
    if (!changes || !changes.description || !changes.project_id) {
        return res.status(400).json({ errorMessage: 'missing required  field' });
    }
    next();
}

function validateProjectId(req, res, next) {
    const id = req.body.project_id;
    Projects.findById(id)
        .then(data => {
            if (!data)
                return res.status(400).json({ errorMessage: 'wrong project id' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get Projects' });
        });
    next();
}
module.exports = router;
