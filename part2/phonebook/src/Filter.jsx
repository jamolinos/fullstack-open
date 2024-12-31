const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <div>
      <label htmlFor="nameFilter">filter shown with: : </label>
      <input
        id="nameFilter"
        type="text"
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
    </div>
  );
};

export default Filter;
