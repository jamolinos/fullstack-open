const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number} <br />{" "}
    </>
  );
};

const Persons = ({ personsToShow }) => {
  return (
    <>
      {" "}
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

export default Persons;
