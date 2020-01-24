const express = require('express');

const Projects = require('../data/models/projectsModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.find()
        .then(data => {
            const map = data.map(x => 
                Object.assign(Object.assign({}, x), 
                    {completed: x.completed === 0 ? false : true}));
            res.json(map);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get Projects' });
        });
});

router.post('/', validateProjects, (req, res) => {
    const change = req.body;
    if (!change.completed || change.completed === false) {
        change.completed = 0;
    } else if (change.completed === true) {
        change.completed = 1;
    }  
    Projects.add(change)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new Project' });
        });
});

function validateProjects(req, res, next) {
    const changes = req.body;
    if (!changes || !changes.name) {
        return res.status(400).json({ errorMessage: 'missing required  field' });
    }
    next();
}

module.exports = router;
