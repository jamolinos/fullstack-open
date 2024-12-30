import Header from "./Header";
import Content from "./Content";
import TotalExercises from "./TotalExercises";

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <TotalExercises parts={course.parts} />
    </>
  );
};

export default Course;
