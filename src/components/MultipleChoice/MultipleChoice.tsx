import { useEffect, useState } from "react";

interface Question {
  id: number;
  text: string;
  options: {
    id: number;
    value: string;
  }[];
  answers: number[];
}

interface UserAnswer {
  questionId: number;
  answers: number[];
}

interface CheckedAnswer {
  questionId: number;
  answers: { optionId: number; isCorrect: boolean | string }[];
}

interface Props {
  question: Question;
  index: number;
  setUserAnswers: (params: (prevState: UserAnswer[]) => UserAnswer[]) => void;
  checkedAnswers: CheckedAnswer[];
  isSubmitted: boolean;
}

const MultipleChoice: React.FC<Props> = ({
  question,
  index,
  setUserAnswers,
  checkedAnswers,
  isSubmitted,
}) => {
  const [missedAnswersCount, setMissedAnswersCount] = useState<number>(0);

  const handleOptionChange = (questionId: number, optionId: number) => {
    setUserAnswers((prevState) => {
      // Find the existing answer for the question
      const existingAnswer = prevState.find(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswer) {
        const updatedAnswer = { ...existingAnswer };

        if (updatedAnswer.answers.includes(optionId)) {
          updatedAnswer.answers = updatedAnswer.answers.filter(
            (id) => id !== optionId
          );
        } else {
          updatedAnswer.answers = [...updatedAnswer.answers, optionId];
        }

        return prevState.map((answer) =>
          answer.questionId === questionId ? updatedAnswer : answer
        );
      }

      // If there's no existing answer, add a new one
      return [
        ...prevState,
        {
          questionId,
          answers: [optionId],
        },
      ];
    });
  };

  useEffect(() => {
    const checkedAnswer = checkedAnswers.find(
      (answer) => answer.questionId === question.id
    );
    if (checkedAnswer) {
      checkedAnswer.answers.forEach((answer) => {
        const option = document.getElementById(
          `option-${checkedAnswer.questionId}-${answer.optionId}`
        ) as HTMLLabelElement;

        if (option) {
          if (answer.isCorrect === true) {
            option.classList.add("bg-correct");
          } else if (answer.isCorrect === "unanswered") {
            setMissedAnswersCount((prevState) => prevState + 1);
          } else {
            option.classList.add("bg-incorrect", "shake");
          }
        }
      });
    }
  }, [checkedAnswers, question.id]);

  return (
    <article>
      <h2 className="font-medium text-xl mb-3">
        <span className="mr-2">{index + 1}.</span>
        {question.text}
      </h2>
      <ul>
        {question.options.map((option) => {
          return (
            <li
              className="relative flex items-center "
              key={`${question.id}-${option.id}`}
            >
              <input
                  disabled={isSubmitted}
                className="check-btn ms-3  absolute translate-y-[-50%]"
                id={`${question.id}-${option.id}`}
                type="checkbox"
                name={`question-${question.id}`}
                value={option.value}
                onChange={() => handleOptionChange(question.id, option.id)}
              />
              <label
                id={`option-${question.id}-${option.id}`}
                htmlFor={`${question.id}-${option.id}`}
                className="single-option py-2 ps-8 pe-3 border  rounded-lg mb-3 flex-1 font-medium cursor-pointer"
              >
                {option.value}
              </label>
            </li>
          );
        })}
      </ul>
      {missedAnswersCount > 0 && (
        <p className="text-red-500">
          {missedAnswersCount} missed answer{missedAnswersCount > 1 && "s"}
        </p>
      )}
    </article>
  );
};

export default MultipleChoice;
