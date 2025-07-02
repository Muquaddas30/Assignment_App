const express = require("express");
const router = express.Router();
const { verifyToken, allowRoles } = require("../middlewares/auth");

router.use(verifyToken, allowRoles("student"));

const {viewQuiz, submitQuiz} = require("../controllers/studentController");


router.get("/quizzes", viewQuiz);


router.post("/quizzes/:quizId/submit", submitQuiz);

module.exports = router;
