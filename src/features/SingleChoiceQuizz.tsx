import { SingleChoice } from "components";
import { useState } from "react";
import { questions } from "data/singleChoice.json";

type UserAnswer = {
  questionId: number;
  answer: boolean;
  optionId: number;
};

const SingleChoiceQuizz = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);

  const checkAnswersHandler = () => {
    // const correctAnswers = questions.map((question) => {
    //   const userAnswer = userAnswers.find(
    //     (userAnswer) => userAnswer.questionId === question.id
    //   );
    //   return {
    //     questionId: question.id,
    //     answers:
    //       userAnswer?.answer ===
    //       question.options.find((option) => option.isCorrect)?.isCorrect,
    //     optionId: userAnswer?.optionId,
    //   };
    const correctAnswers = userAnswers.filter(
      (answer) => answer.answer === true
    );

    setCheckedAnswers([...userAnswers]);
    setUserScore((correctAnswers.length / questions.length) * 100);
    setIsSubmitted(true);
  };

  return (
    <section>
      <h1 className="question-type-header">
        1. Select the Correct Answer: Single Choice Questions
      </h1>
      <div className="max-w-[500px] flex flex-col gap-4">
        {questions.map((question, index) => (
          <SingleChoice
            key={question.id}
            question={question}
            index={index}
            onChange={setUserAnswers}
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

export default SingleChoiceQuizz;
