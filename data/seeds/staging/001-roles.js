
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_roles').insert([
        {role:'ADMIN'},
        {role:'OPERATOR'},
        {role:'DINER'}
      ]);
    });
};
