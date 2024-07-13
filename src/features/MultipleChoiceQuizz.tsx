import { MultipleChoice } from "components";
import { questions } from "data/multipleChoice.json";
import { useState } from "react";

interface UserAnswer {
  questionId: number;
  answers: number[];
}

interface CheckedAnswer {
  questionId: number;
  answers: { optionId: number; isCorrect: boolean | string }[];
}

const MultipleChoiceQuizz = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<CheckedAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);

  const checkAnswersHandler = () => {
    const checkedAnswers = questions.map((question) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.questionId === question.id
      );

      const checkedAnswer: CheckedAnswer = {
        questionId: question.id,
        answers: [],
      };

      if (userAnswer) {
        if (userAnswer.answers.length >= question.answers.length) {
          for (const answer of userAnswer.answers) {
            if (question.answers.includes(answer)) {
              checkedAnswer.answers.push({
                optionId: answer,
                isCorrect: true,
              });
            } else {
              checkedAnswer.answers.push({
                optionId: answer,
                isCorrect: false,
              });
            }
          }
        } else {
          let missedAnswers = [...question.answers];
          for (const answer of userAnswer.answers) {
            if (question.answers.includes(answer)) {
              checkedAnswer.answers.push({
                optionId: answer,
                isCorrect: true,
              });
              missedAnswers = missedAnswers.filter((id) => id !== answer);
            } else {
              checkedAnswer.answers.push({
                optionId: answer,
                isCorrect: false,
              });
            }
          }

          for (const answer of missedAnswers) {
            checkedAnswer.answers.push({
              optionId: answer,
              isCorrect: "unanswered",
            });
          }
        }
      }

      return checkedAnswer;
    });

    const correntAnswers = checkedAnswers
      .map((answer) =>
        answer.answers.every((answer) => answer.isCorrect === true)
      )
      .filter((answer) => answer === true).length;
    setUserScore((correntAnswers / questions.length) * 100);
    setCheckedAnswers(checkedAnswers);
    setIsSubmitted(true);
  };

  return (
    <section>
      <h1 className="question-type-header">3. Multiple Choice Questions</h1>

      <div className="flex flex-col gap-4 max-w-[500px]">
        {questions.map((question, index) => (
          <MultipleChoice
            key={question.id}
            question={question}
            index={index}
            setUserAnswers={setUserAnswers}
            checkedAnswers={checkedAnswers}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>

      <div className="my-4">
        {isSubmitted && (
          <div>
            <p>
              Your score is: <strong>{userScore.toFixed(2)}%</strong>
            </p>
          </div>
        )}
      </div>

      <button
        disabled={userAnswers.length !== questions.length || isSubmitted}
        onClick={checkAnswersHandler}
        type="submit"
        className="submit-btn"
      >
        Check answers
      </button>
    </section>
  );
};

export default MultipleChoiceQuizz;
