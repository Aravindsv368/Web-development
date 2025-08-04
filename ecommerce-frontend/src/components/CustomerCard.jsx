import React from "react";

const CustomerCard = ({ customer }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:scale-105 transition">
      <h2 className="text-lg font-bold">
        {customer.first_name} {customer.last_name}
      </h2>
      <p className="text-sm text-gray-600">{customer.email}</p>
      <p className="text-sm mt-2">
        Orders: <span className="font-semibold">{customer.orderCount}</span>
      </p>
    </div>
  );
};

export default CustomerCard;
