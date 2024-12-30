const TotalExercises = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <p>
      {" "}
      <strong>total of {totalExercises} exercises</strong>{" "}
    </p>
  );
};

export default TotalExercises;
