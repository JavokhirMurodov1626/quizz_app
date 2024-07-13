import { useEffect, useRef } from "react";

type UserAnswer = {
  questionId: number;
  placeId: number;
  answer: string;
};

type CheckedAnswers = {
  questionId: number;
  placeId: number;
  isCorrect: boolean;
};

type TextInputProps = {
  questionId: number;
  placeId: number;
  setUserAnswers: (param: (prev: UserAnswer[]) => UserAnswer[]) => void;
  checkedAnswers: CheckedAnswers[];
  isSubmitted: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  questionId,
  placeId,
  setUserAnswers,
  checkedAnswers,
  isSubmitted,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswers((prev) => {
      const existingAnswer = prev.find(
        (answer) =>
          answer.questionId === questionId && answer.placeId === placeId
      );
      if (existingAnswer) {
        return prev.map((answer) =>
          answer.questionId === questionId && answer.placeId === placeId
            ? { ...answer, answer: e.target.value }
            : answer
        );
      }
      return [
        ...prev,
        {
          questionId,
          placeId,
          answer: e.target.value,
        },
      ];
    });
  };

  // auto resize input field
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const target = input.current;

    if (target && target.scrollWidth > 120) {
      target.style.width = target.scrollWidth + "px";
    }

    if (target && target.value === "") {
      target.style.width = "120px";
    }
  }, [input, input.current?.value]);

  useEffect(() => {
    const checkedAnswer = checkedAnswers.find(
      (answer) => answer.questionId === questionId && answer.placeId === placeId
    );

    if (checkedAnswer && input.current) {
      if (checkedAnswer.isCorrect) {
        input.current.classList.add(
          "bg-correct"
        );
      } else {
        input.current.classList.add("bg-incorrect",'shake');
      }
    }
  }, [checkedAnswers, questionId, placeId]);

  return (
    <input
      id={`input-${questionId}-${placeId}`}
      ref={input}
      className="border border-slate-100 mb-2 px-2 py-1 rounded-lg bg-slate-100 focus:border-blue-500  font-medium outline-none w-[120px]"
      type="text"
      readOnly={isSubmitted}
      onChange={handleChange}
    />
  );
};

export default TextInput;
