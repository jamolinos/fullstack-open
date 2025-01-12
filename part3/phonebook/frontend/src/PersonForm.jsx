const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="number">name: </label>
        <input id="name" value={newName} onChange={handleNameChange} required />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input
          id="number"
          type="tel"
          value={newNumber}
          // pattern="[0-9]{3}-[0-9]{6}"
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
