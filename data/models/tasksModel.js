const db = require('../dbConfig.js');

module.exports = {
    find,
    add
};

function find() {
    return db('tasks as t')
           .join ('projects as p', 't.project_id', 'p.id')
           .select('t.id', 't.notes', 't.completed', 'p.name', 'p.description');
}

function add(post) {
    return db('tasks')
        .insert(post, 'id')
        .then(ids => ({ id: ids[0] }));
}