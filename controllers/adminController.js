// const User = require('../database/models/user');
// const Quiz = require('../database/models/quiz');

const { User, Quiz } = require('../database/models')
const models = global.models;
const bcrypt = require('bcrypt');


const createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the teacher
    const teacher = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'teacher',
    });

    res.status(201).json({
      message: 'Teacher created', teacher: {

        name: teacher.name,
        email: teacher.email,
        role: teacher.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating teacher' });
  }
};
// Get One Teacher 
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await User.findOne({
      where: { id, role: 'teacher' }
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get teacher' });
  }
};

// Get All Teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.findAll({ where: { role: 'teacher' } });
    res.status(200).json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get teachers' });
  }
};

// Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await User.update(updates, {
      where: { id, role: 'teacher' }
    });

    if (result[0] === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update teacher' });
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.destroy({
      where: { id, role: 'teacher' }
    });

    if (!result) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [
        {
          model: models.User,
          as: 'teacher',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.status(200).json(quizzes);
  } catch (err) {
    console.log({ err })
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ error: 'Failed to retrieve quizzes' });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Quiz.destroy({ where: { id } });

    if (!result) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const [updated] = await Quiz.update(
      { title, status },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json({ message: "Quiz updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update quiz" });
  }
};


module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes
};
