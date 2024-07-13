import { useState, DragEvent, useRef, useEffect } from "react";
import "./DroppableArea.css";
import { UserAnswer, CheckedAnswers } from "features/DragAndDropQuizz";

type Props = {
  questionId: number;
  placeId: number;
  setUserAnswers: (param: (prev: UserAnswer[]) => UserAnswer[]) => void;
  checkedAnswers: CheckedAnswers[];
  isSubmitted: boolean;
};

const DroppableArea: React.FC<Props> = ({
  questionId,
  placeId,
  setUserAnswers,
  checkedAnswers,
  isSubmitted,
}) => {
  const [draggingData, setDraggingData] = useState<{
    id: number;
    value: string;
  }>({ id: 0, value: "" });

  const ref = useRef<HTMLInputElement>(null);
  const inputWrap = useRef<HTMLDivElement>(null);
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (ref.current) ref.current.classList.add("dragover");
    return false;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (draggingData.id === data.id) return;

    const answer = {
      questionId,
      placeId,
      value: data.value,
    };

    const previousAnswerBlock = document.querySelector(
      `#answer-${draggingData.id}`
    ) as HTMLSpanElement;

    if (previousAnswerBlock) {
      previousAnswerBlock.style.display = "inline-block";
      previousAnswerBlock.style.opacity = "1";

      setUserAnswers((prev: UserAnswer[]) => {
        const updatedAnswers = prev.filter(
          (item) => item.questionId !== questionId || item.placeId !== placeId
        );
        return [...updatedAnswers, answer];
      });
    } else {
      setUserAnswers((prev: UserAnswer[]) => [...prev, answer]);
    }

    const currentAnswerBlock = document.querySelector(
      `#answer-${data.id}`
    ) as HTMLSpanElement;

    if (currentAnswerBlock && ref.current) {
      ref.current.style.width = `${currentAnswerBlock.offsetWidth}px`;
      currentAnswerBlock.style.display = "none";
    }

    setDraggingData(data);
    if (ref.current) {
      ref.current.classList.remove("dragover");
      ref.current.classList.add("draggable");
      inputWrap.current?.classList.add("border-none");
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    if (ref.current) ref.current.classList.remove("dragover");
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    if (ref.current) ref.current.classList.add("dragover");
  };

  useEffect(() => {
    const userAnswer = checkedAnswers?.find(
      (item) => item.questionId === questionId && item.placeId === placeId
    );
    if (userAnswer && ref.current) {
      if (userAnswer.isCorrect) {
        ref.current.classList.add("border-green-500");
      } else {
        ref.current.classList.add("border-red-500", "shake");
      }
    } else {
      ref.current?.classList.remove(
        "border-green-500",
        "border-red-500",
        "shake"
      );
    }
  
  }, [checkedAnswers, questionId, placeId]);

  return (
    <div
      ref={inputWrap}
      id="droppable-area"
      className=" inline-block  max-w-fit mb-2"
    >
      <input
        id={`answer-${questionId}-${placeId}`}
        className="question border outline-none w-[100px] text-black rounded-lg px-2 py-1"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        readOnly={true}
        value={draggingData.value}
        autoComplete="off"
        size={8}
        ref={ref}
        onClick={() => {
          if (isSubmitted) return;
          const answerBlock = document.querySelector(
            `#answer-${draggingData.id}`
          ) as HTMLSpanElement;
          if (answerBlock) {
            answerBlock.style.display = "inline-block";
            answerBlock.style.opacity = "1";
            setDraggingData({ id: 0, value: "" });
            setUserAnswers((prev: UserAnswer[]) =>
              prev.filter(
                (item) =>
                  item.questionId !== questionId || item.placeId !== placeId
              )
            );
            if (ref.current) {
              ref.current.classList.remove("draggable");
              ref.current.style.width = "auto";
              inputWrap.current?.classList.remove("border-none");
            }
          }
        }}
      />
    </div>
  );
};

export default DroppableArea;
