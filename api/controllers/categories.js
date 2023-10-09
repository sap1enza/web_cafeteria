const uuidv4 = require("uuid/v4");

module.exports = (app) => {
  const categoriesDB = app.data.categories;
  const controller = {};

  const { categories: categoriesMock } = categoriesDB;

  controller.listCategories = (req, res) => res.status(200).json(categoriesDB);

  controller.saveCategory = (req, res) => {
    categoriesMock.data.push({
      id: uuidv4(),
      name: req.body.name,
    });

    res.status(201).json(categoriesMock);
  };

  return controller;
};
