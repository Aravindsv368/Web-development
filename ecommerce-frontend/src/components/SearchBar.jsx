import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className="border p-2 rounded-md w-full md:w-1/3 shadow-sm focus:outline-none"
      placeholder="Search by email..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
