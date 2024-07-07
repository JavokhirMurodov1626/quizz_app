import { useState, DragEvent } from "react";

const DroppableArea = () => {
  //   const [isDragging, setIsDragging] = useState(false);
  const [draggingData, setDraggingData] = useState<{
    id: number;
    text: string;
  }>({ id: 0, text: "" });

  //   const handleDragEnter = (event: DragEvent) => {
  //     event.preventDefault();
  //     setIsDragging(true);
  //   };

  //   const handleDragLeave = (event: DragEvent) => {
  //     event.preventDefault();
  //     setIsDragging(false);
  //   };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    setDraggingData(JSON.parse(data));
    console.log("dropped", data);
  };

  return (
    <input
      className="question bg-slate-300 p-4 m-4 rounded-xl"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      readOnly={true}
      value={draggingData.text}
      autoComplete="off"
      
    />
    
   
  );
};

export default DroppableArea;
