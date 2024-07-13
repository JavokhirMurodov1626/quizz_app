import { questions } from "data/trueFalse.json";
import { useState, useEffect } from "react";
import { TrueFalseSelect } from "components";

type UserAnswer = {
  questionId: number;
  answer: boolean;
};

type CheckedAnswer = {
  questionId: number;
  isCorrect: boolean;
};

const TrueFalseQuizz = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState<CheckedAnswer[]>([]);
  const [userScore, setUserScore] = useState(0);

  const checkAnswersHandler = () => {
    const correctAnswers = questions.map((question) => {
      const userAnswer = userAnswers.find(
        (userAnswer) => userAnswer.questionId === question.id
      );
      return {
        questionId: question.id,
        isCorrect: userAnswer?.answer === question.answer,
      };
    });
    setCheckedAnswers(correctAnswers);
    const correctAnswersCount = correctAnswers.filter((answer) => answer.isCorrect).length;
    setUserScore((correctAnswersCount / questions.length) * 100);
    setIsSubmitted(true);
  };

  useEffect(() => {}, [checkedAnswers]);

  return (
    <section>
      <h1 className="question-type-header">5. True False Questions</h1>

      <ul className="mb-4">
        {questions.map((question, index) => {
          return (
            <li key={question.id} className="flex gap-4 mb-3 items-center">
              <p className="text-xl">
                <span>{index + 1}. </span>
                {question.text}
              </p>
              <TrueFalseSelect
                question={question}
                isSubmitted={isSubmitted}
                setUserAnswers={setUserAnswers}
                checkedAnswers={checkedAnswers}
              />
            </li>
          );
        })}
      </ul>
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

export default TrueFalseQuizz;
