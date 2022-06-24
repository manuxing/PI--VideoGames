const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //poner en el pront cualquier cosa que falte con defaults de strings
  //poner imagen default en front
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max:5
      }
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false,
  });
};
