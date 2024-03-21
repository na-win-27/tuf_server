const express = require("express");
const { createSubmission } = require("../controllers/judge.js");

const router = express.Router();

router.post("/", createSubmission);

module.exports = router;
