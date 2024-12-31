import { useState } from "react";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const areElementsEqual = (element1, element2) => element1 === element2;

  const areNotObjectOrNull = (element1, element2) => {
    const condition =
      typeof element1 !== "object" &&
      element1 === null &&
      typeof element2 !== "object" &&
      element2 === null;

    return condition ? true : false;
  };

  const areKeysSameLength = (element1, element2) => {
    const keys1 = Object.keys(element1);
    const keys2 = Object.keys(element2);

    return keys1.length === keys2.length;
  };

  const deepEqual = (element1, element2) => {
    if (areElementsEqual(element1, element2)) {
      console.log("Elements are equal");
      return true;
    }

    if (areNotObjectOrNull(element1, element2)) {
      console.log("Not an object or null");
      return false;
    }

    if (!areKeysSameLength(element1, element2)) {
      console.log("Keys not same length");
      return false;
    }

    const keys1 = Object.keys(element1);

    for (let key of keys1) {
      if (
        !element2.hasOwnProperty(key) ||
        !deepEqual(element1[key], element2[key])
      ) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber };

    const isNewPerson = persons.every(
      (person) => !deepEqual(person, newPerson)
    );

    if (!isNewPerson) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const personsToShow =
    nameFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter)
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
