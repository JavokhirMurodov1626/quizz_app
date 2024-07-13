import React, { DragEvent, useRef } from "react";

type Props = {
  answer: {
    id: number;
    value: string;
  };
};

const DraggableAnswer: React.FC<Props> = ({ answer }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const dragStartHandler = (e: DragEvent<HTMLSpanElement>) => {
    //send whole object as string
    if (ref.current) {
      ref.current.style.opacity = "0.4";
    }
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify(answer));
  };

  const dragEndHandler = () => {
    if (ref.current) {
      ref.current.style.opacity = "1";
    }
  };

  return (
    <span
      id={`answer-${answer.id}`}
      ref={ref}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      draggable={true}
      className="answer draggable inline-blocktransition duration-300 ease-in-out text-xl"
    >
      {answer.value}
    </span>
  );
};

export default DraggableAnswer;
