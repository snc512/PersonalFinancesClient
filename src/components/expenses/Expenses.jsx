import React, { Component } from 'react';
import api from "../../api/axiosConfig";
import AddExpenseModal from './AddExpenseModal'; // Make sure to provide the correct path


class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddExpenseModalOpen: false,
      expenses: [],
    };
  }

  toggleAddExpenseModal = () => {
    this.setState((prevState) => ({
      isAddExpenseModalOpen: !prevState.isAddExpenseModalOpen,
    }));
  };

  async componentDidMount() {
    try {
      const response = await api.get('/api/v1/expenses');
      console.log(response.data[0].category);
      response.data.map((expense) => (
        console.log(expense.transDate)
      ));
      this.setState({ expenses: response.data });
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  render() {
    const { expenses } = this.state;

    return (
      <div className=' px-10 py-10 w-full text-center flex flex-col justify-center'>
        <div className='pb-8'>
          <button
            className='bg-[#0b3b2c] text-white px-4 py-2 rounded mt-4'
            onClick={this.toggleAddExpenseModal}
          >
            Add Expense
          </button>

          <AddExpenseModal
            isOpen={this.state.isAddExpenseModalOpen}
            onClose={this.toggleAddExpenseModal}
          />

        </div>

        <h1 className='text-white md:text-4xl sm:text-3xl text-xl font-bold md:py-6'>Expenses</h1>
        <table>
          <thead>
            <tr className='text-[#00df9a] md:text-xl sm:text-sm text-sm font-bold'>
              <th>Card</th>
              <th>Transaction Date</th>
              <th>Reference Number</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className='text-white  md:text-xl sm:text-sm text-sm pl-2'>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className= 'border border-gray-600'>{expense.cardLast4}</td>
                <td className= 'border border-gray-600'>{new Date(expense.transDate).toLocaleDateString()}</td>
                <td className= 'border border-gray-600'>{expense.referenceNumber}</td>
                <td className= 'border border-gray-600'>{expense.description}</td>
                <td className= 'border border-gray-600'>{expense.category.toString()}</td>
                <td className= 'border border-gray-600'>{expense.charges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Expenses;
