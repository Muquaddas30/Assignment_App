const  User = require("../database/models/user");
const  Question = require("../database/models/question");
const  Quiz = require("../database/models/quiz");
const  Submission = require("../database/models/submission");
const  Grade = require("../database/models/grade");

const createQuizWithQuestions = async (req, res) => {
  try {
    const { title, status, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      status,
      teacherId: req.user.id, 
    });

    const formattedQuestions = questions.map(q => ({
      quizId: quiz.id,
      questionText: q.questionText,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correctOption: q.correctOption,
    }));


    await Question.bulkCreate(formattedQuestions);

    res.status(201).json({
      message: "Quiz created successfully",
      quizId: quiz.id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

const viewSubmission = async (req, res) => {
  try {
    const { quizId } = req.params;

    const submissions = await Submission.findAll({
      where: { quizId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Grade,
          attributes: ['score', 'remarks'],
        },
      ],
    });

    res.json(submissions);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve submissions" });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { score, remarks } = req.body; 

    
    const submission = await Submission.findByPk(submissionId);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }


    let grade = await Grade.findOne({ where: { submissionId } });

    if (grade) {
      grade.score = score;
      grade.remarks = remarks;
      await grade.save();
    } else {
      grade = await Grade.create({
        submissionId,
        score,
        remarks,
      });
    }

    res.json({ message: "Submission graded successfully", grade });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to grade submission" });
  }
};

module.exports = {
  createQuizWithQuestions,
  viewSubmission,
  gradeSubmission
};
