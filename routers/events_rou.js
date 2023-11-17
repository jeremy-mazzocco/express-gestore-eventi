const express = require("express");
// const multer = require("multer");
const router = express.Router();
const eventsController = require("../controllers/events_ctrl");

// router.use(authMiddleware);



router.get("/", eventsController.index)
router.post("/store", eventsController.store)
router.put("/update", eventsController.update)


module.exports = router;