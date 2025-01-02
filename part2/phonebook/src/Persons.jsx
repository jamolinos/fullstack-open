const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number} <br />{" "}
    </>
  );
};

const Persons = ({ personsToShow }) => {
  const isArrayEmpty = personsToShow.length === 0;

  const contentToShow = isArrayEmpty
    ? ""
    : personsToShow.map((person) => (
        <Person key={person.name} person={person} />
      ));

  return <>{contentToShow}</>;
};

export default Persons;
