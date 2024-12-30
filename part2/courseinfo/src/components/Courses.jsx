import Course from "./Course";

const Courses = ({ courses }) => {
  return courses.map((course) => {
    return <Course key={course.id} course={course} />;
  });
};

export default Courses;
