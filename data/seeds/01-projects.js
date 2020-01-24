exports.seed = function (knex) {
    return knex("projects").insert([
        {
            name: 1,
            description: "solve prime number theory",
            completed: 0
        },
        {
            name: 134,
            description: "solve prime number theory",
            completed: 1
        },
    ]);
};