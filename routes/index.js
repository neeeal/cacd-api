const express = require("express");
const router = express.Router();

// Use the routes
const initRoutes = (app) => {
  // Route logging middleware
  router.use((req, res, next) => {
    console.log(`[ROUTE]: ${req.method} ${req.originalUrl}`);
    next();
  });

  router.use("/user", require("./user.js"));
  router.use("/auth", require("./auth.js"));
  router.use("/church", require("./church.js"));
  router.use("/event", require("./event.js"));
  router.use("/photo", require("./photo.js"));
  router.use("/team", require("./team.js"));
  router.use("/album", require("./album.js"));
  router.use("/company", require("./company.js"));
  router.use("/admin", require("./admin.js"));
  router.use("/eventRegistration", require("./eventRegistration.js"));
  router.use("/role", require("./role.js"));
  router.use("/permission", require("./permission.js"));
  router.use("/rolePermission", require("./rolePermission.js"));
  // TODO: add action monitoring route for each action done by user. study how to monitor user actions
  router.use("/contact", require("./contact.js")); 
  // router.use("/ticket", require("./ticket.js")); 
  return app.use("/api", router);
};

module.exports = initRoutes;
