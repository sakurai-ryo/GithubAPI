'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Favorites', [{
      name: "d3",
      openGraphImageUrl: "https://avatars3.githubusercontent.com/u/1562726?s=400&v=4",
      stargazers: 91285,
      url: "https://d3js.org",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Favorite', null, {});
  }
};