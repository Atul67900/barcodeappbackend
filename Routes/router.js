const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storageConfig")


//routes

router.post("/barcode/register",upload.single("user_profile"),controllers.userpost);
router.get("/barcode/details", controllers.userget);
router.get("/barcode/:id", controllers.singlebarcodeget);
router.put("/barcode/edit/:id",upload.single("user_profile"),controllers.barcodeedit);
router.delete("/barcode/delete/:id",controllers.barcodedelete);


module.exports = router