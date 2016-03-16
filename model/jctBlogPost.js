/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jctBlogPost', {
    idBlog: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'blog',
      }
    },
    idPost: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
      }
    }
  }, {
    tableName: 'jctBlogPost',
    freezeTableName: true,
    timestamps: false
  });
};
