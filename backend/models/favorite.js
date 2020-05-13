'use strict';

module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    name: DataTypes.STRING,
    openGraphImageUrl: DataTypes.STRING,
    stargazers: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  Favorite.associate = function (models) {
    // associations can be defined here
  };
  return Favorite;
};