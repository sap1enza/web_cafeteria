module.exports = (app) => {
  const controller = app.controllers.categories;

  app
    .route("/api/v1/categories")
    .get(controller.listCategories)
    .post(controller.saveCategory);
};
