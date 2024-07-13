import "./App.css";
import {
  DragAndDropQuizz,
  SingleChoiceQuizz,
  MultipleChoiceQuizz,
  TextInputQuizz
} from "features";
import dragDropQuizzData from "data/dragAndDrop.json";

function App() {
  return (
    <>
      <main className="">
        <div className="lg:w-[50%] mx-auto h-screen p-4 lg:p-8">
          <h1 className="text-2xl mb-3 text-center">Quizz App</h1>
          {/* <DragAndDropQuizz
            answers={dragDropQuizzData.answers}
            questions={dragDropQuizzData.questions}
          />
          <SingleChoiceQuizz /> */}
          {/* <MultipleChoiceQuizz /> */}
          <TextInputQuizz />
        </div>
      </main>
    </>
  );
}

export default App;
