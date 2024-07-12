import { DraggableAnswer, DroppableArea } from "components";
import { useState } from "react";

type Answer = {
  id: number;
  value: string;
};

export interface UserAnswer {
  questionId: number;
  placeId: number;
  value: string;
}

export interface CheckedAnswers extends UserAnswer {
  isCorrect: boolean;
}

type Question = {
  id: number;
  text: string;
  answers: { place: number; value: string }[];
};

type Props = {
  answers: Answer[];
  questions: Question[];
};

const DragAndDropQuizz: React.FC<Props> = ({ answers, questions }) => {
  // const [isDroppableArea, setIsDroppableArea] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<CheckedAnswers[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);

  const checkAnswers = () => {
    const correctAnswers = questions.map((question) => {
      const correctAnswer = question.answers.map((answer) => {
        const userAnswer = userAnswers.find(
          (userAnswer) =>
            userAnswer.questionId === question.id &&
            userAnswer.placeId === answer.place
        );
        setCheckedAnswers((prev) => [
          ...prev,
          {
            ...userAnswer,
            isCorrect: userAnswer?.value === answer.value,
          },
        ]);
        return userAnswer?.value === answer.value;
      });
      return correctAnswer.every((answer) => answer);
    });

    const userCorrectAnswer = correctAnswers.filter((answer) => answer);
    setUserScore((userCorrectAnswer.length / correctAnswers.length) * 100);
    setIsSubmitted(true);
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-5">
        2. Complete the sentences with words from the list by dragging and
        dropping the appropriate word into each blank
      </h2>
      <div className="answers flex gap-3 mb-4 flex-wrap">
        {answers.map((answer) => (
          <DraggableAnswer key={answer.id} answer={answer} />
        ))}
      </div>
      <ul>
        {questions.map((question, questionId) => {
          let placesCount = 0;
          const questionSlices = question.text.split(" ");
          return (
            <li className="mb-4" key={question.id}>
              <span className="me-2 ">{questionId + 1}.</span>
              {questionSlices.map((slice) => {
                if (slice === "___") {
                  placesCount++;
                  return (
                    <>
                      <DroppableArea
                        questionId={questionId + 1}
                        placeId={placesCount}
                        setUserAnswers={setUserAnswers}
                        checkedAnswers={checkedAnswers}
                        isSubmitted={isSubmitted}
                      />{" "}
                    </>
                  );
                } else if (slice.includes("___")) {
                  const [sliceStart, sliceEnd] = slice.split("___");
                  let content;
                  if (sliceStart === "") {
                    placesCount++;
                    content = (
                      <>
                        <DroppableArea
                          questionId={questionId + 1}
                          placeId={placesCount}
                          setUserAnswers={setUserAnswers}
                          checkedAnswers={checkedAnswers}
                          isSubmitted={isSubmitted}
                        />
                        {sliceEnd}{" "}
                      </>
                    );
                  } else {
                    placesCount++;
                    content = (
                      <>
                        {sliceStart}
                        <DroppableArea
                          questionId={questionId + 1}
                          placeId={placesCount}
                          setUserAnswers={setUserAnswers}
                          checkedAnswers={checkedAnswers}
                          isSubmitted={isSubmitted}
                        />{" "}
                      </>
                    );
                  }
                  return content;
                }
                return slice + " ";
              })}
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
        onClick={checkAnswers}
        disabled={userAnswers.length !== answers.length}
        className="border rounded-lg px-4 py-2 bg-green-600 active:bg-green-700 text-white font-medium disabled:bg-green-300 disabled:text-gray-5 disabled:cursor-not-allowed"
      >
        Check answers
      </button>
    </>
  );
};

export default DragAndDropQuizz;
