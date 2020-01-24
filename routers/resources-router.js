const express = require('express');

const Resources = require('../data/models/resourcesModel');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get Resources' });
        });
});

router.post('/', validateResources, (req, res) => {
    const change = req.body;

    Resources.add(change)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new Resource' });
        });
});

function validateResources(req, res, next) {
    const changes = req.body;
    if (!changes || !changes.name) {
        return res.status(400).json({ errorMessage: 'missing required  field' });
    }
    next();
}

module.exports = router;
