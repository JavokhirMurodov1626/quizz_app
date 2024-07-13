import { TextInput } from "components";
import { questions } from "data/textInput.json";
import { useState, useEffect } from "react";

type UserAnswer = {
  questionId: number;
  placeId: number;
  answer: string;
};

type CheckedAnswers = {
  questionId: number;
  placeId: number;
  isCorrect: boolean;
};

const TextInputQuizz = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState<CheckedAnswers[]>([]);
  const [blanksCount, setBlanksCount] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const checkAnswersHandler = () => {
    const checkedAnswers = userAnswers.map((userAnswer) => {
      const question = questions.find(
        (question) => question.id === userAnswer.questionId
      );
      const correctAnswer = question?.answers.find(
        (answer) => answer.place === userAnswer.placeId
      );
      return {
        ...userAnswer,
        isCorrect:
          correctAnswer?.value.toLowerCase().trim() ===
          userAnswer.answer.toLowerCase(),
      };
    });

    const map = new Map();

    checkedAnswers.forEach((answer) => {
      if (map.has(answer.questionId)) {
        map.set(answer.questionId, [
          ...map.get(answer.questionId),
          answer.isCorrect,
        ]);
      } else {
        map.set(answer.questionId, [answer.isCorrect]);
      }
    });
   
    const correctAnswersCount = Array.from(map.values())
      .map((item) => item.every((value: boolean) => value))
      .filter((value) => value).length;

    setUserScore((correctAnswersCount / questions.length) * 100);
    setCheckedAnswers(checkedAnswers);
    setIsSubmitted(true);
  };

  useEffect(() => {
    const totalBlanks = questions.reduce(
      (count, question) => count + question.answers.length,
      0
    );
    setBlanksCount(totalBlanks);
  }, []);

  return (
    <section>
      <h1 className="question-type-header">4. Fill the blanks</h1>
      <ul className="flex flex-col gap-4">
        {questions.map((question, index) => {
          let placeCount = 0;
          const questionSlices = question.text.split(" ");

          return (
            <li className="text-xl" key={question.id}>
              <span className="me-2 ">{index + 1}.</span>
              {questionSlices.map((slice, sliceIndex) => {
                if (slice === "___") {
                  placeCount++;
                  return (
                    <TextInput
                      key={`${question.id}-${placeCount}-${sliceIndex}`}
                      questionId={question.id}
                      placeId={placeCount}
                      setUserAnswers={setUserAnswers}
                      checkedAnswers={checkedAnswers}
                      isSubmitted={isSubmitted}
                    />
                  );
                } else if (slice.includes("___")) {
                  const [sliceStart, sliceEnd] = slice.split("___");
                  let content;
                  if (sliceStart === "") {
                    placeCount++;
                    content = (
                      <>
                        <TextInput
                          key={`${question.id}-${placeCount}-${sliceIndex}`}
                          questionId={question.id}
                          placeId={placeCount}
                          setUserAnswers={setUserAnswers}
                          checkedAnswers={checkedAnswers}
                          isSubmitted={isSubmitted}
                        />
                        {sliceEnd}{" "}
                      </>
                    );
                  } else {
                    placeCount++;
                    content = (
                      <>
                        {sliceStart}
                        <TextInput
                          key={`${question.id}-${placeCount}-${sliceIndex}`}
                          questionId={question.id}
                          placeId={placeCount}
                          setUserAnswers={setUserAnswers}
                          checkedAnswers={checkedAnswers}
                          isSubmitted={isSubmitted}
                        />{" "}
                        {sliceEnd}
                      </>
                    );
                  }
                  return content;
                } else {
                  return slice + " ";
                }
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
        disabled={userAnswers.length !== blanksCount || isSubmitted}
        onClick={checkAnswersHandler}
        type="submit"
        className="submit-btn"
      >
        Check answers
      </button>
    </section>
  );
};

export default TextInputQuizz;
