const Person = ({ person, handleDelete }) => {
  return (
    <>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person)}>delete</button> <br />{" "}
    </>
  );
};

const Persons = ({ personsToShow, handleDelete }) => {
  const isArrayEmpty = personsToShow.length === 0;

  const contentToShow = isArrayEmpty
    ? ""
    : personsToShow.map((person) => (
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      ));

  return <>{contentToShow}</>;
};

export default Persons;
