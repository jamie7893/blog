/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog', {
    idUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'blog',
    freezeTableName: true,
    timestamps: false
  });
};
