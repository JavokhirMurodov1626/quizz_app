import { useState, DragEvent, useRef } from "react";
import "./DroppableArea.css";

type Props = {
  questionId: number;
  placeId: number;
  onDrop: (param: boolean) => void;
};

const DroppableArea: React.FC<Props> = ({ onDrop }) => {
  //   const [isDragging, setIsDragging] = useState(false);
  const [draggingData, setDraggingData] = useState<{
    id: number;
    value: string;
  }>({ id: 0, value: "" });

  const ref = useRef<HTMLInputElement>(null);

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

    const previosAnswerBlock = document.querySelector(
      `#answer-${draggingData.id}`
    ) as HTMLSpanElement;

    if (previosAnswerBlock) {
      previosAnswerBlock.style.display = "inline-block";
      previosAnswerBlock.style.opacity = "1";
    }

    const currentAnswerBlock = document.querySelector(
      `#answer-${data.id}`
    ) as HTMLSpanElement;

    if (currentAnswerBlock && ref.current) {
      ref.current.style.width = `${currentAnswerBlock.offsetWidth}px`;
    }

    setDraggingData(data);

    if (ref.current) {
      ref.current.classList.remove("dragover");
      ref.current.classList.add("draggable");
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    if (ref.current) ref.current.classList.remove("dragover");
    onDrop(false);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    if (ref.current) ref.current.classList.add("dragover");
    onDrop(true);
  };

  return (
    <div
      id="droppable-area"
      className=" inline-block border-b border-black max-w-fit mb-2"
    >
      <input
        id="input"
        className="question border outline-none w-[100px] text-black"
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
          const answerBlock = document.querySelector(
            `#answer-${draggingData.id}`
          ) as HTMLSpanElement;
          if (answerBlock) {
            answerBlock.style.display = "inline-block";
            answerBlock.style.opacity = "1";
            setDraggingData({ id: 0, value: "" });
            if (ref.current) {
              ref.current.classList.remove("draggable");
              ref.current.style.width = "auto";
            }
          }
        }}
      />
    </div>
  );
};

export default DroppableArea;
