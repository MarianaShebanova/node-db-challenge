const db = require('../dbConfig.js');

module.exports = {
    find,
    add,
    findById
};

function find() {
    return db('projects');
}

function findById(id) {
    return db('projects').where({ id: Number(id) }).first();
}

function add(post) {
    return db('projects')
        .insert(post, 'id')
        .then(ids => ({ id: ids[0] }));
}