import "./App.css";
import { DraggableAnswer,DroppableArea } from "components";
// drag and drop quiz app
const answers = [
  { id: 1, text: "answer 1" },
  { id: 2, text: "answer 2" },
  { id: 3, text: "answer 3" },
  { id: 4, text: "answer 4" },
];

function App() {
  return (
    <>
      <main className="">
        <div className="w-[50%] mx-auto bg-slate-200 h-screen">
          <div className="answers ">
            {answers.map((answer) => (
              <DraggableAnswer key={answer.id} answer={answer} />
            ))}
          </div>
          <div> 
            <DroppableArea />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
