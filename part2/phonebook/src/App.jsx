import { useState, useEffect } from "react";

import comparator from "./utils/comparator";
import crudService from "./services/crudService";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    crudService.getAll().then((personsList) => {
      setPersons(personsList);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPerson = { name: newName, number: newNumber };

    const personsToCompare = persons.map((person) => {
      return {
        name: person.name,
        number: person.number,
      };
    });

    let isNewPerson = true;

    for (const person of personsToCompare) {
      if (comparator.areDeepEqual(person, newPerson)) {
        isNewPerson = false;
        break;
      }
    }

    if (isNewPerson) {
      crudService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
      });
    } else {
      if (
        confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personId = persons.find(
          (person) => person.name === newPerson.name
        ).id;

        newPerson = { ...newPerson, id: personId };

        crudService.updateById(personId, newPerson).then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? newPerson : person
            )
          );
        });
      } else {
        alert(`Number change canceled`);
      }
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

  const handleDelete = ({ id, name }) => {
    if (confirm(`Delete ${name}?`)) {
      crudService.deleteById(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
    } else {
      alert(`Deletion canceled`);
    }
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
