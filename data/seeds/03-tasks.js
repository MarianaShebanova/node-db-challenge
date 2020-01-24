exports.seed = function (knex) {
    return knex("tasks").insert([
        {
            notes: 1,
            description: "solve prime number theory123",
            completed: 0,
            project_id: 1
        },
        {
            notes: 134,
            description: "solve prime number theory123343",
            completed: 0,
            project_id: 1
        },
    ]);
};