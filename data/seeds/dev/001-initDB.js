
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'rowValue1',password:'somepass',email:'12y3'},
        {username: 'rowValue2',password:'somepass',email:'12yy3'},
        {username: 'rowValue3',password:'somepass',email:'1yt23'}
      ]);
    });
};
