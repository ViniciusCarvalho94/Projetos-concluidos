module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define(
    "sale",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(50),
    },
    {
      underscored: true,
      timestamps: false,
      tableName: "sales",
    }
  );

  sale.associate = (models) => {
    sale.belongsTo(models.user, { foreignKey: "id", as: "user_id" });
    sale.belongsTo(models.user, { foreignKey: "id", as: "seller_id" });
  };
  return sale;
};
