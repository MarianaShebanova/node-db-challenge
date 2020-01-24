const db = require('../dbConfig.js');

module.exports = {
    find,
    add
};

function find() {
    return db('resources');
}

function add(post) {
    return db('resources')
        .insert(post, 'id')
        .then(ids => ({ id: ids[0] }));
}