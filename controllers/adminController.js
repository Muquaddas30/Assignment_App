const { User } = require('../database/models/user');
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

    res.status(201).json({ message: 'Teacher created', teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating teacher' });
  }
};
// Get One Teacher by ID
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

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};
