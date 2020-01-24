exports.seed = function (knex) {
    return knex("resources").insert([
        {
            name: 1,
            description: "solve prime number theory123",
        },
        {
            name: 134,
            description: "solve prime number theory123",
        },
    ]);
};