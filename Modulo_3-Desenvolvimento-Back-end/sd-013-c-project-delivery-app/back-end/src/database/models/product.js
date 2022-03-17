module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING(200),
    },
    { underscored: true, timestamps: false, tableName: "products" }
  );

  product.associate = (models) => {
    product.hasMany(models.saleProduct, {
      foreignKey: "productId",
      as: "products",
    });
  };
  return product;
};
