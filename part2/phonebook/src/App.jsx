import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState("");

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject));
    console.log("persons", persons);

    axios
      .post("http://localhost:3003/persons", personObject)
      .then((response) => response.data)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/persons")
      .then((response) => setPersons(response.data));
  }, []);

  useEffect(() => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
