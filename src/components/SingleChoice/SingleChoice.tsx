import { useEffect } from "react";

type UserAnswer = {
  questionId: number;
  answer: boolean;
  optionId: number;
};

interface Question {
  id: number;
  text: string;
  options: { id: number; value: string; isCorrect: boolean }[];
}

interface SingleChoiceProps {
  question: Question;
  index: number;
  onChange: (param: (prev: UserAnswer[]) => UserAnswer[]) => void;
  checkedAnswers: UserAnswer[];
  isSubmitted: boolean;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  question,
  index,
  onChange,
  checkedAnswers,
  isSubmitted,
}) => {
  const selectOptionHandler = (
    answer: boolean,
    questionId: number,
    optionId: number
  ) => {
    onChange((prev: UserAnswer[]) => {
      if (prev.find((item) => item.questionId === questionId)) {
        return prev.map((item) =>
          item.questionId === questionId ? { ...item, answer } : item
        );
      }
      return [...prev, { questionId, answer, optionId }];
    });
  };

  useEffect(() => {
    checkedAnswers.map((answer) => {
      const option = document.getElementById(
        `option-${answer.questionId}-${answer.optionId}`
      ) as HTMLLabelElement;
 
      if (option) {
        if (answer.answer) {
          option.classList.add("bg-correct");
        } else {
          option.classList.add("bg-incorrect", "shake");
        }
      }
    });
  }, [checkedAnswers]);

  return (
    <article>
      <h2 className="font-medium text-xl mb-3">
        <span className="mr-2">{index + 1}.</span>
        {question.text}
      </h2>
      <ul>
        {question.options.map((option) => (
          <li
            className="relative flex items-center "
            key={`${question.id}-${option.id}`}
          >
            <input
              disabled={isSubmitted}
              className="check-btn ms-3  absolute translate-y-[-50%]"
              id={`${question.id}-${option.id}`}
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              onChange={() => {
                if (isSubmitted) return;
                selectOptionHandler(option.isCorrect, question.id, option.id);
              }}
            />
            <label
              id={`option-${question.id}-${option.id}`}
              htmlFor={`${question.id}-${option.id}`}
              className="single-option py-2 ps-8 pe-3 border  rounded-lg mb-3 flex-1 font-medium cursor-pointer"
            >
              {option.value}
            </label>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SingleChoice;
