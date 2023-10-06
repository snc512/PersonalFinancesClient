import React, { useState } from "react";
import api from "../../api/axiosConfig";

const AddExpenseModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    cardLast4: "",
    transDate: "10-05-2023",
    postDate: "2023-10-05",
    referenceNumber: "ABCD1234",
    description: "asdf",
    credits: 200.00
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await api.post('/api/v1/expenses', formData); 
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <div className={`${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay bg-gray-800 opacity-50"></div>
      <div className="bg-opacity-50 fixed inset-0 z-50">
        <div className="border modal-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="modal-content bg-[#000300] p-6 rounded shadow-md">
            <h2 className="text-white text-lg font-semibold mb-4">
              Add Expense
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                className="border p-2 mb-2 rounded"
                type="text"
                placeholder="Card Last 4"
                name="cardLast4"
                value={formData.cardLast4}
                onChange={handleChange}
              />
              <input
                className="border p-2 mb-2 rounded"
                type="date"
                placeholder="Transaction Date"
                name="transDate"
                value={formData.transDate}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Add
              </button>
            </form>
          </div>
          <button
            className="modal-close absolute top-0 right-0 m-2"
            onClick={onClose}
          >
            <span className="text-gray-600 text-lg">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
