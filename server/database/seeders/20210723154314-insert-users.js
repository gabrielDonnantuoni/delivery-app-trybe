const md5 = require('md5');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: md5('--adm2@21!!--'),
        role: 'administrator',
      },
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: md5('fulana@123'),
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: md5('$#zebirita#$'),
        role: 'customer',
      },
      {
        id: 4,
        name: 'admin',
        email: 'admin@gmail.com',
        password: md5('123456'),
        role: 'administrator',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
