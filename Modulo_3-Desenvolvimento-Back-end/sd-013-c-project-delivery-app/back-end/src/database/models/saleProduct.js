module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    "saleProduct",
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      underscored: true,
      timestamps: false,
      tableName: "salesProducts",
    }
  );

  saleProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      as: "product",
      through: saleProduct,
      foreignKey: "saleId",
      otherKey: "productId",
    });
    models.product.belongsToMany(models.sale, {
      as: "sale",
      through: saleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  };
  return saleProduct;
};
