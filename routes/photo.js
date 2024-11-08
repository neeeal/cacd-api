// user.js
const express = require("express");
const fileUpload = require("../middlewares/fileUpload.js");
const router = express.Router();
const controller = require("../controllers/photo.js");
const validation = require("../middlewares/validation.js");

router.get("/", controller.get)
router.get("/getOne", controller.getOne)
router.post("/", 
  fileUpload.single("default"), 
  controller.post
)
router.put("/", 
  fileUpload.fields([
    // { name: "featuredPhoto", maxCount: 1 },
    { name: "default", maxCount: 99 }
  ]), 
  controller.put
)
router.delete("/:OID", controller.delete)

module.exports = router;  
