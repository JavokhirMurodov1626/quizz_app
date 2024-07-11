import { DraggableAnswer, DroppableArea } from "components";
import { useState } from "react";

type Answer = {
  id: number;
  value: string;
};

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
  const [isDroppableArea, setIsDroppableArea] = useState<boolean>(false);
  return (
    <>
      <div className="answers flex gap-3 mb-4 flex-wrap">
        {answers.map((answer) => (
          <DraggableAnswer
            key={answer.id}
            answer={answer}
            isDroppableArea={isDroppableArea}
          />
        ))}
      </div>
      <ul>
        {questions.map((question, questionId) => {
          const questionSlices = question.text.split(" ");
          return (
            <li className="mb-4" key={question.id}>
              <span className="me-2 ">{questionId + 1}.</span>
              {questionSlices.map((slice, sliceId) => {
                if (slice === "___") {
                  return (
                    <>
                      <DroppableArea
                        onDrop={setIsDroppableArea}
                        questionId={questionId + 1}
                        placeId={sliceId + 1}
                      />{" "}
                    </>
                  );
                } else if (slice.includes("___")) {
                  const [sliceStart, sliceEnd] = slice.split("___");
                  let content;
                  if (sliceStart === "") {
                    content = (
                      <>
                        <DroppableArea
                          onDrop={setIsDroppableArea}
                          questionId={questionId + 1}
                          placeId={sliceId + 1}
                        />
                        {sliceEnd}{" "}
                      </>
                    );
                  } else {
                    content = (
                      <>
                        {sliceStart}
                        <DroppableArea
                          onDrop={setIsDroppableArea}
                          questionId={questionId + 1}
                          placeId={sliceId + 1}
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
    </>
  );
};

export default DragAndDropQuizz;
