module.exports = {
  // eslint-disable-next-line max-lines-per-function
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      salesDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    }),
  
  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('sales'),

};
