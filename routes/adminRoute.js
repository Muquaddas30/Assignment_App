const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const adminController = require("../controllers/adminController");
const { verifyToken, allowRoles } = require("../middlewares/auth");
const handleValidation = require("../middlewares/validate");


router.use(verifyToken, allowRoles("admin"));

router.post(
  "/teachers",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  handleValidation,
  adminController.createTeacher
);

router.get("/teachers", adminController.getAllTeachers);

// ✅ Get One Teacher by ID
router.get(
  "/teachers/:id",
  [param("id").isInt().withMessage("ID must be an integer")],
  handleValidation,
  adminController.getTeacherById
);


router.put(
  "/teachers/:id",
  [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  handleValidation,
  adminController.updateTeacher
);

router.delete(
  "/teachers/:id",
  [param("id").isInt().withMessage("ID must be an integer")],
  handleValidation,
  adminController.deleteTeacher
);

module.exports = router;
