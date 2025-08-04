import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerCard from "./components/CustomerCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customers");
        setCustomers(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load customers.");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filtered = customers.filter((c) =>
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Customer Dashboard
      </h1>
      <div className="mb-6 flex justify-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((customer) => (
              <CustomerCard key={customer._id} customer={customer} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No customers found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
