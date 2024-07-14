import "./App.css";
import {
  DragAndDropQuizz,
  SingleChoiceQuizz,
  MultipleChoiceQuizz,
  TextInputQuizz,
  TrueFalseQuizz,
} from "features";
import { Header } from "components";
import dragDropQuizzData from "data/dragAndDrop.json";
import { useState } from "react";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  let content = null;

  switch (activeIndex) {
    case 0:
      content = <SingleChoiceQuizz />;
      break;
    case 1:
      content = (
        <DragAndDropQuizz
          answers={dragDropQuizzData.answers}
          questions={dragDropQuizzData.questions}
        />
      );
      break;
    case 2:
      content = <MultipleChoiceQuizz />;
      break;
    case 3:
      content = <TextInputQuizz />;
      break;
    case 4:
      content = <TrueFalseQuizz />;
      break;
    default:
      break;
  }

  return (
    <>
      <Header activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      <main className="bg-slate-100 main">
        <div className=" content bg-white lg:w-[50%] mx-auto p-4 lg:p-8">
          {content}
        </div>
      </main>

      <footer className="lg:w-[50%] mx-auto p-4 flex justify-between pb-10">
        <button
          disabled={activeIndex === 0}
          className="border border-blue-500 text-blue-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg px-4 py-2 font-medium text-xl"
          onClick={() =>
            setActiveIndex((prev) => {
              if (prev === 0) return 0;
              return prev - 1;
            })
          }
        >
          Olgingisi
        </button>

        <button
          disabled={activeIndex === 4}
          className="border rounded-lg px-4 py-2 font-medium text-white text-xl bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={() =>
            setActiveIndex((prev) => {
              if (prev === 4) return 4;
              return prev + 1;
            })
          }
        >
          Keyingisi
        </button>
      </footer>
    </>
  );
}

export default App;
