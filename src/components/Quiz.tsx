import React, { useState } from "react";

const initialSentences = [
  { id: 1, text: "The quick brown ___ jumps over the lazy ___." },
  { id: 2, text: "She sells ___ by the ___." },
];

const initialWords = [
  { id: 1, text: "fox" },
  { id: 2, text: "dog" },
  { id: 3, text: "seashells" },
  { id: 4, text: "seashore" },
];

const correctAnswers = {
  1: ["fox", "dog"],
  2: ["seashells", "seashore"],
};

function QuizApp() {
  const [sentences, setSentences] = useState(initialSentences);
  const [words, setWords] = useState(initialWords);
  const [draggingWord, setDraggingWord] = useState(null);

  const handleDragStart = (e, word) => {
    setDraggingWord(word);
  };

  const handleDragEnd = () => {
    setDraggingWord(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, sentenceId, gapIndex) => {
    e.preventDefault();
    if (draggingWord) {
      setSentences((prevSentences) =>
        prevSentences.map((sentence) =>
          sentence.id === sentenceId
            ? {
                ...sentence,
                text: sentence.text
                  .split("___")
                  .map((part, index) =>
                    index === gapIndex ? draggingWord.text : part
                  )
                  .join("___"),
              }
            : sentence
        )
      );
      setWords((prevWords) =>
        prevWords.filter((word) => word.id !== draggingWord.id)
      );
      setDraggingWord(null);
    }
  };

  const handleRemoveWord = (sentenceId, gapIndex) => {
    const removedWord = sentences.find((sentence) => sentence.id === sentenceId)
      .words[gapIndex];
    setSentences((prevSentences) =>
      prevSentences.map((sentence) =>
        sentence.id === sentenceId
          ? {
              ...sentence,
              words: sentence.words.map((word, index) =>
                index === gapIndex ? null : word
              ),
            }
          : sentence
      )
    );
    setWords((prevWords) => [...prevWords, removedWord]);
  };

  const handleSubmit = () => {
    const isCorrect = sentences.every((sentence) =>
      sentence.words.every(
        (word, index) => word.text === correctAnswers[sentence.id][index]
      )
    );
    alert(isCorrect ? "Correct!" : "Try again.");
  };

  const renderSentence = (sentence) => {
    const parts = sentence.text.split("___");
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span
            className="drop-box"
            onDrop={(e) => handleDrop(e, sentence.id, index)}
            onDragOver={handleDragOver}
            onClick={() => handleRemoveWord(sentence.id, index)}
          >
            {sentence.words && sentence.words[index]}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div>
      <h1>Drag and Drop Quiz</h1>
      <div className="word-list">
        {words.map((word) => (
          <div
            key={word.id}
            draggable
            onDragStart={(e) => handleDragStart(e, word)}
            onDragEnd={handleDragEnd}
          >
            {word.text}
          </div>
        ))}
      </div>
      <div className="sentences">
        {sentences.map((sentence) => (
          <div key={sentence.id} className="sentence">
            {renderSentence(sentence)}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuizApp;
