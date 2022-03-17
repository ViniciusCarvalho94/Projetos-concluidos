"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        field: "user_id",
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        field: "seller_id",
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: "total_price",
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: "delivery_address",
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "delivery_number",
      },
      saleDate: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE,
        field: "sale_date",
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "Pendente",
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("sales");
  },
};
