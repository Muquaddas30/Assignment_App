const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const teacherController = require("../controllers/teacherController");
const { verifyToken, allowRoles } = require("../middlewares/auth");
const handleValidation = require("../middlewares/validate");


router.use(verifyToken, allowRoles("teacher"));


router.post(
  "/quizzes",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("status").isIn(["active", "pending", "submitted"]).withMessage("Invalid status"),
    body("questions").isArray({ min: 1 }).withMessage("Questions must be a non-empty array")
  ],
  handleValidation,
  teacherController.createQuizWithQuestions
);


router.get(
  "/quizzes/:quizId/submission",
  [param("quizId").isInt().withMessage("Quiz ID must be an integer")],
  handleValidation,
  teacherController.viewSubmission
);


router.put(
  "/submission/:submissionId/grade",
  [
    param("submissionId").isInt().withMessage("Submission ID must be an integer"),
    body("score").isInt({ min: 0 }).withMessage("Score must be a positive integer"),
    body("remarks").optional().isString().withMessage("Remarks must be text")
  ],
  handleValidation,
  teacherController.gradeSubmission
);

module.exports = router;
