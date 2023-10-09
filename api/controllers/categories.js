module.exports = (app) => {
  const categoriesDB = app.data.categories;
  const controller = {};

  controller.listCategories = (req, res) => res.status(200).json(categoriesDB);

  return controller;
};
