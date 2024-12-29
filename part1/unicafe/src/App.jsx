import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={all} />
        <StatisticsLine text={"average"} value={average} />
        <StatisticsLine text={"positive"} value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [selected, setSelected] = useState(0);

  const all = good + neutral + bad;
  const score = good + 0 * neutral + -1 * bad;
  const average = (score / (all === 0 ? 1 : all)).toFixed(1);
  const positive = `${((good * 100) / (all === 0 ? 1 : all)).toFixed(1)} %`;

  const handleClick = (option) => {
    if (option === "good") {
      setGood(good + 1);
    }
    if (option === "neutral") {
      setNeutral(neutral + 1);
    }
    if (option === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
