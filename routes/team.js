// user.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/team.js");
const validation = require("../middlewares/validation.js");
const fileUpload = require("../middlewares/fileUpload.js");
const auth = require("../middlewares/auth.js");
const company = require("../middlewares/company.js");
const authCodes = require("../config/authCodes.js");
const newFileUpload = require("../middlewares/newFileUpload.js");

router.get(
  "/byCompany/:company", 
  controller.getByCompany
)

router.get(
  "/:team/byCompany/:company",
  controller.getOne
)

router.get(
  "/", 
  auth.authorizeAccess(authCodes.team.read),
  controller.get
)

// router.get("/getOne", controller.getOne)
router.post(
  "/", 
  auth.authorizeAccess(authCodes.team.create),
  // fileUpload.single("teamPhoto"), 
  newFileUpload,
  company.assignCompany,
  controller.post
)

router.put(
  "/", 
  auth.authorizeAccess(authCodes.team.update),
  // fileUpload.single("teamPhoto"), 
  newFileUpload,
  company.assignCompany,
  controller.put
)

router.delete(
  "/:OID", 
  auth.authorizeAccess(authCodes.team.delete),
  company.assignCompany,
  controller.delete
)

module.exports = router;  
