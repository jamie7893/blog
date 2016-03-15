/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jctBlogPost', {
    idBlog: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'blog',
        key: 'id'
      }
    },
    idPost: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  }, {
    tableName: 'jctBlogPost',
    freezeTableName: true,
    timestamps: false
  });
};
