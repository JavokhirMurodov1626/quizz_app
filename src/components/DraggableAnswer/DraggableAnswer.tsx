import React, { DragEvent, useRef, useState } from "react";

type Props = {
  answer: {
    id: number;
    text: string;
  };
};

const DraggableAnswer: React.FC<Props> = ({ answer }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const dragStartHandler = (e: DragEvent<HTMLSpanElement>) => {
    //send whole object as string
    e.dataTransfer.setData("text/plain", JSON.stringify(answer));
    // ref.current?.classList.add("");
    if (ref.current) {
      ref.current.classList.add("bg-slate-400");
      ref.current.style.position = "relative";
      ref.current.style.zIndex = "1000";
      ref.current.style.top = `${e.clientY}px`;
      ref.current.style.left = `${e.clientX}px`;
      console.log(e.clientX, e.clientY);
    }
  };

  const dragEndHandler = (e: DragEvent<HTMLSpanElement>) => {
    if (ref.current) {
      ref.current.classList.remove("bg-slate-400");
    }
  };

  const mouseDownHandler = (e: DragEvent<HTMLSpanElement>) => {
    const target = ref.current;
    if (target) {
      target.offsetLeft;
      target.offsetTop;
      setInitialX(e.clientX - target.offsetLeft);
      setInitialY(e.clientY - target.offsetTop);
    }
  };

  const mouseMoveHandler = (e: DragEvent<HTMLSpanElement>) => { 
    const target = ref.current;
    if (target) {
      target.style.left = `${e.clientX - initialX}px`;
      target.style.top = `${e.clientY - initialY}px`;
    }
  };
  return (
    <span
      ref={ref}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      draggable={true}
      className="answer inline-block bg-slate-300 p-2 m-2 rounded-xl cursor-move"
    >
      {answer.text}
    </span>
  );
};

export default DraggableAnswer;
