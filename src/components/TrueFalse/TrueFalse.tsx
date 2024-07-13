import { useEffect } from "react";

type Question = {
  id: number;
  text: string;
  answer: boolean;
};

type UserAnswer = {
  questionId: number;
  answer: boolean;
};

type TrueFalseSelectProps = {
  question: Question;
  isSubmitted: boolean;
  setUserAnswers: (param: (prev: UserAnswer[]) => UserAnswer[]) => void;
  checkedAnswers: { questionId: number; isCorrect: boolean }[];
};

const TrueFalseSelect: React.FC<TrueFalseSelectProps> = ({
  question,
  isSubmitted,
  setUserAnswers,
  checkedAnswers,
}) => {
  const handleSelectChange = (value: string, questionId: number) => {
    if (!value) {
      setUserAnswers((prev) =>
        prev.filter((answer) => answer.questionId !== questionId)
      );
      return;
    }

    setUserAnswers((prev) => {
      const existingAnswer = prev.find(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswer) {
        return prev.map((answer) =>
          answer.questionId === questionId
            ? { ...answer, answer: value === "true" }
            : answer
        );
      } else {
        return [...prev, { questionId, answer: value === "true" }];
      }
    });
  };

  useEffect(() => {
    const checkedAnswer = checkedAnswers.find(
      (checkedAnswer) => checkedAnswer.questionId === question.id
    );
    if (checkedAnswer) {
      const selectElement = document.getElementById(
        `select-${question.id}`
      ) as HTMLSelectElement;
    
      if (checkedAnswer.isCorrect) {
        selectElement.classList.add("bg-correct");
      } else {
        selectElement.classList.add("bg-incorrect",'shake');
      }
    }
  }, [checkedAnswers, question.id]);

  return (
    <select
      disabled={isSubmitted}
      id={`select-${question.id}`}
      className=" px-2 py-1 rounded-lg border font-medium"
      onChange={(e) => handleSelectChange(e.target.value, question.id)}
    >
      <option value="">Select</option>
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  );
};

export default TrueFalseSelect;
