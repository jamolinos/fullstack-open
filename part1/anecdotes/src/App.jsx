import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selectedAnecdoteIndex, setSelected] = useState(0);
  const [scoreArray, setScoreArray] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const handleNextAnecdote = () => {
    const anecdoteIndex = Math.floor(Math.random() * 8);
    setSelected(anecdoteIndex);
  };

  const handleVote = () => {
    const arrayCopy = [...scoreArray];
    arrayCopy[selectedAnecdoteIndex] = arrayCopy[selectedAnecdoteIndex] + 1;
    setScoreArray(arrayCopy);
  };

  const getIndexOfAnecdoteWithMostVotes = () => {
    let indexOfMaxVotes = 0;
    let maxVotes = 0;
    for (let i = 0; i <= anecdotes.length; i++) {
      if (scoreArray[i] >= maxVotes) {
        maxVotes = scoreArray[i];
        indexOfMaxVotes = i;
      }
    }
    return indexOfMaxVotes;
  };

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>
          {anecdotes[selectedAnecdoteIndex]} <br />
          has {scoreArray[selectedAnecdoteIndex]} votes
        </p>
        <div>
          <button onClick={handleVote}>vote</button>
          <button onClick={handleNextAnecdote}>next anecdote</button>
        </div>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>
          {anecdotes[getIndexOfAnecdoteWithMostVotes()]} <br />
          has {scoreArray[getIndexOfAnecdoteWithMostVotes()]} votes
        </p>
      </div>
    </>
  );
};

export default App;
