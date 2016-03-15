/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userInfo', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cell: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'userInfo',
    freezeTableName: true,
    timestamps: false
  });
};
