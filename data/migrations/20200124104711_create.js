

exports.up = function (knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.text('name', 128)
                .unique()
                .notNullable();
            tbl.text('description');
            tbl.integer('completed');
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.text('name', 128)
                .unique()
                .notNullable();
            tbl.text('description');
        })
        .createTable('projects_resources', tbl => {
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                // this table must exist already
                .inTable('projects');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                // this table must exist already
                .inTable('resources');
            // the combination of the two keys becomes our primary key
            // will enforce unique combinations of ids
            tbl.primary(['project_id', 'resource_id']);
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.text('description')
                .notNullable();
            tbl.text('notes');
            tbl.integer('completed');
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};