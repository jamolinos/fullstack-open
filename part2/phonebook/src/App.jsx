import { useState, useEffect } from "react";

import crudService from "./services/crudService";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    isSuccess: true,
  });

  useEffect(() => {
    crudService.getAll().then((personsList) => {
      setPersons(personsList);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPerson = { name: newName, number: newNumber };

    const isNewPerson = isNewRegistration(newPerson);

    if (isNewPerson) {
      crudService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        triggerNotification(`Added ${createdPerson.name}`, true);
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

        const personToUpdate = { ...newPerson, id: personId };

        crudService
          .updateById(personId, personToUpdate)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            triggerNotification(`Updated ${updatedPerson.name}`, true);
          })
          .catch((error) => {
            triggerNotification(
              `Information of ${personToUpdate.name} has already been removed from server`,
              false
            );
          });
      } else {
        alert(`Number change canceled`);
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const isNewRegistration = (lookupPerson) => {
    const personAlreadyRegistered = persons.find(
      (person) => person.name === lookupPerson.name
    );

    const isNewRegistration = personAlreadyRegistered === undefined;

    return isNewRegistration;
  };

  const triggerNotification = (name, isSuccess) => {
    const notification = { message: name, isSuccess: isSuccess };

    setNotification(notification);
    setTimeout(() => {
      setNotification({ message: null, isSuccess: true });
    }, 5000);
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
      <Notification notification={notification} />
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
