const express = require("express");
const {
  postCode,
  getCodes,
  getCodeById,
  getUserName,
  checkCache,
  updateCode
} = require("../controllers/genral.js");

const router = express.Router();

router.get("/user/:id", checkCache, getUserName);
router.get("/:id", getCodeById);
router.post("/", postCode);
router.get("/", getCodes);
router.put("/code/:id",updateCode);

module.exports = router;
