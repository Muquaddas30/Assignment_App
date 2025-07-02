const  User = require("../database/models/user");
const  Question = require("../database/models/question");
const  Quiz = require("../database/models/quiz");
const  Submission = require("../database/models/submission");

const viewQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      where: { status:"active" },
       include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "name"]
        },
        {
          model: Question,
          attributes: ["id", "questionText", "option1", "option2", "option3", "option4"]
        }
      ]
      
    });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve quizzes" });
  }
};


const submitQuiz = async (req,res) => {
    try{
        const {quizId} = req.params;
        const {answers} = req.body;

      if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Answers must be an array" });
    }
    
    const alreadySubmit = await Submission.findOne({
    
      where:{
        studentId: req.user.id,
        quizId:quizId
      }

    });
    if( alreadySubmit){
      return res.status(400).json({error:"Quiz already submitted"})
    }

    let score = 0;

    for (const answer of answers){
      const question = await Question.findByPk(answer.questionId);
      if(question && question.correctOption == answer.selectedOption){
         score+=1;
      }}

    const submission = await Submission.create({
     quizId: quizId,
      studentId: req.user.id,
      submittedAt: new Date(), 
      isSubmitted: true,
      score: score
    });

    res.status(201).json({
      message: "Quiz submitted successfully",
      submission: {
        quizId,
        userId: req.user.id,
        score
      } 

    })
  }
    catch(err){
    console.error(err);
    res.status(500).json({ error: "Failed to submmit" });
    }
   
};

module.exports = {viewQuiz, submitQuiz};