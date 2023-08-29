/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'provider');
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'provider', {
      type: Sequelize.INTEGER,
      default: false,
      allowNull: false,
    });
  },
};
